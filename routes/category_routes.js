// routes/cityRoutes.js
const express = require('express');
const router = express.Router();
const catController = require('../controllers/category_controller'); // Adjust the path

// Route to get all cities
router.get('/all', catController.getAllCategories);

module.exports = router;
