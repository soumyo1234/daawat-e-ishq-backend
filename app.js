// server/app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Connect DB
connectDB();

// Middleware
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',')
  : (process.env.NODE_ENV === 'production'
    ? ['https://daawat-e-ishq-frontend.vercel.app']
    : ['http://localhost:3000']);

app.use(cors({
  origin: function(origin, callback){
    // Allow requests with no origin (like mobile apps or curl)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) !== -1){
      return callback(null, true);
    } else {
      return callback(new Error('CORS policy: This origin is not allowed'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
const { userMenuRouter, adminMenuRouter } = require('./routes/menuRoutes');
const { userReservationRouter, adminReservationRouter } = require('./routes/reservationRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const { userOrderRouter, adminOrderRouter } = require('./routes/orderRoutes');
const adminAuthRoutes = require('./routes/adminAuth');

app.use('/api/menu', userMenuRouter);
app.use('/admin/menu', adminMenuRouter);
app.use('/api/reservations', userReservationRouter);
app.use('/admin/reservations', adminReservationRouter);
app.use('/api/reviews', reviewRoutes);
app.use('/api/orders', userOrderRouter);
app.use('/admin/orders', adminOrderRouter);
app.use('/admin/auth', adminAuthRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Contact route (sends real emails to configured contact address)
const contactRoutes = require('./routes/contactRoutes');
app.use('/api/contact', contactRoutes);

// Test endpoint (mounted at /api/test)
const testRoutes = require('./routes/testRoutes');
app.use('/api/test', testRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({
    error: err.message || 'Internal Server Error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found'
  });
});

module.exports = app;
