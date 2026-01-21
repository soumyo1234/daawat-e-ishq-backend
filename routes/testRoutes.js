const express = require('express');
const router = express.Router();

// Lightweight health check endpoint for frontend
router.get('/', (req, res) => {
  res.json({ status: 'ok', env: process.env.NODE_ENV || 'development' });
});

module.exports = router;
