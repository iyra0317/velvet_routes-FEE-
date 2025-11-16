const express = require('express');
const trainService = require('../services/trainService');
const router = express.Router();

// Get all trains
router.get('/', async (req, res) => {
  try {
    const trains = trainService.getMockTrains();
    res.json(trains);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trains' });
  }
});

// Search trains
router.get('/search', async (req, res) => {
  try {
    const { origin, destination } = req.query;
    const trains = trainService.getMockTrains(origin, destination);
    res.json(trains);
  } catch (error) {
    res.json(trainService.getMockTrains());
  }
});

module.exports = router;
