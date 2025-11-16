const express = require('express');
const busService = require('../services/busService');
const router = express.Router();

// Get all buses
router.get('/', async (req, res) => {
  try {
    const buses = busService.getMockBuses();
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching buses' });
  }
});

// Search buses
router.get('/search', async (req, res) => {
  try {
    const { origin, destination } = req.query;
    const buses = busService.getMockBuses(origin, destination);
    res.json(buses);
  } catch (error) {
    res.json(busService.getMockBuses());
  }
});

module.exports = router;
