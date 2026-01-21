const express = require('express');
const Reservation = require('../models/Reservation');
const authMiddleware = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/authMiddleware');

// User reservation routes
const userReservationRouter = express.Router();
userReservationRouter.post('/', async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json(reservation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// (Optional: add GET /my for user reservations)

// Admin reservation routes
const adminReservationRouter = express.Router();
adminReservationRouter.use(authMiddleware, requireAdmin);
adminReservationRouter.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ date: 1 });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = { userReservationRouter, adminReservationRouter };
