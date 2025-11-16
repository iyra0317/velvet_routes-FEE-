const express = require('express');
const flightService = require('../services/flightService');
const router = express.Router();

// Search flights
router.get('/search', async (req, res) => {
  try {
    const { origin, destination, departDate, returnDate, adults, cabinClass } = req.query;
    
    if (!origin || !destination) {
      return res.json(await flightService.getMockFlights());
    }

    const flights = await flightService.searchFlights(
      origin,
      destination,
      departDate,
      returnDate,
      parseInt(adults) || 1,
      cabinClass || 'economy'
    );

    res.json(flights);
  } catch (error) {
    console.error('Flight search error:', error);
    res.json(await flightService.getMockFlights());
  }
});

// Get all flights (default list)
router.get('/', async (req, res) => {
  try {
    const flights = await flightService.getMockFlights();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching flights' });
  }
});

module.exports = router;
