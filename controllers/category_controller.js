// controllers/cityController.js
const { Category } = require('../models'); // Adjust the path to your models folder

// Get all cat
exports.getAllCategories = async (req, res) => {
  try {
    const cat = await Category.findAll({
      attributes: ['id', 'cat_name'], // Specify required columns
    });
    res.status(200).json({
      success: true,
      data: cat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching cities.',
      error: error.message,
    });
  }
};