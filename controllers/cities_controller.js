// controllers/cityController.js
const { City } = require('../models'); // Adjust the path to your models folder

// Get all cities
exports.getAllCities = async (req, res) => {
  try {
    const cities = await City.findAll({
      attributes: ['city_id', 'city_name', 'state_name'], // Specify required columns
    });
    res.status(200).json({
      success: true,
      data: cities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching cities.',
      error: error.message,
    });
  }
};
