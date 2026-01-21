const express = require('express');
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/authMiddleware');

// User order routes
const userOrderRouter = express.Router();
userOrderRouter.post('/', authMiddleware, orderController.createOrder);
userOrderRouter.get('/my', authMiddleware, orderController.getUserOrders);

// Admin order routes
const adminOrderRouter = express.Router();
adminOrderRouter.get('/', authMiddleware, requireAdmin, orderController.getAllOrders);
// (Optional: add admin update/delete endpoints here)

module.exports = { userOrderRouter, adminOrderRouter };
