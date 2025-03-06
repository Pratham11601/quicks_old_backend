  const models = require('../models');
  const path = require('path');
  const fs = require('fs').promises;

  async function saveAdvertisement   (req, res)  {
    try {
        const { name, url } = req.body;

        // Check if file was uploaded
        const imagePath = req.file ? req.file.path : null;

        const newAdvertise = await models.advertise.create({
            image: imagePath, // Save image path
            name,
            url,
        });

        return res.status(201).json({
            success: true,
            message: 'Advertisement created successfully',
            data: newAdvertise
        });
    } catch (error) {
        console.error('Error saving advertisement:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
  };


  async function getAdvertisements(req, res) {
    try {
        const advertisements = await models.advertise.findAll();

        const formattedAdvertisements = advertisements.map(ad => {
            return {
                image: ad.image || " ", // Use a default value if image is null or undefined
            };
        });

        res.status(200).json(formattedAdvertisements);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
  };

  module.exports = {
      saveAdvertisement :saveAdvertisement,
      getAdvertisements:getAdvertisements
  };
