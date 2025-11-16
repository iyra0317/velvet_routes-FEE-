const express = require('express');
const carRentalService = require('../services/carRentalService');
const router = express.Router();

// Search cars
router.get('/search', async (req, res) => {
  try {
    const { location, pickUpDate, dropOffDate, pickUpTime, dropOffTime } = req.query;
    
    if (!location) {
      return res.json(await carRentalService.getMockCars());
    }

    const cars = await carRentalService.searchCars(
      location,
      pickUpDate,
      dropOffDate,
      pickUpTime || '10:00',
      dropOffTime || '10:00'
    );

    res.json(cars);
  } catch (error) {
    console.error('Car search error:', error);
    res.json(await carRentalService.getMockCars());
  }
});

// Get all cars (default list)
router.get('/', async (req, res) => {
  try {
    const cars = await carRentalService.getMockCars();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cars' });
  }
});

module.exports = router;
