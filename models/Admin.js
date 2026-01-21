const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'admin',
  enum: ['admin', 'superadmin']
  },
  permissions: [{
    type: String,
    enum: ['menu', 'orders', 'reservations', 'analytics', 'reviews', 'users']
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});


module.exports = mongoose.model('Admin', adminSchema);
