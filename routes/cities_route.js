// routes/cityRoutes.js
const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cities_controller'); // Adjust the path

// Route to get all cities
router.get('/all', cityController.getAllCities);

module.exports = router;
