  const models = require('../models');
  const path = require('path');
  const fs = require('fs').promises;

  function saveAdvertisement(req, res) {
      try {
        
          const image = req.file;

          if (!image) {
              return res.status(400).json({ message: 'Advertise image is required.' });
          }

    
          const advertise = {
        
            image: path.join('uploads', 'advertise', image.filename).replace(/\\/g, '/'),
          
          };

          models.advertise.create(advertise)
              .then((result) => {
                  res.status(201).json({
                      message: 'Advertisement saved successfully',
                      advertisement: result,
                  });
              })
              .catch((err) => {
                  res.status(500).json({
                      message: 'Failed to save advertisement',
                      error: err,
                  });
              });
      } catch (error) {
          console.error(error);
          res.status(500).json({
              message: 'Internal server error',
              error: error.message,
          });
      }
  }

  function editAdvertisement(req, res) {
      try {
          const { title, description } = req.body;
          const { id } = req.params;

          const advertiseImage = req.file;

          if (!advertiseImage) {
              return res.status(400).json({ message: 'Advertise image is required.' });
          }

          // Find the existing advertisement in the database
          models.Advertisement.findByPk(id)
              .then((advertisement) => {
                  if (!advertisement) {
                      return res.status(404).json({ message: 'Advertisement not found.' });
                  }

                  // Remove the old image file if it exists
                  if (advertisement.advertiseImage) {
                      const imagePath = path.join(__dirname, '../', advertisement.advertiseImage);
                      fs.unlink(imagePath).catch((err) => console.error('Failed to delete old image:', err));
                  }

                  // Update the advertisement details in the database
                  advertisement.title = title;
                  advertisement.description = description;
                  advertisement.advertiseImage = path.join('uploads', 'advertise', advertiseImage.filename).replace(/\\/g, '/');

                  advertisement.save()
                      .then((result) => {
                          res.status(200).json({
                              message: 'Advertisement updated successfully',
                              advertisement: result,
                          });
                      })
                      .catch((err) => {
                          res.status(500).json({
                              message: 'Failed to update advertisement',
                              error: err,
                          });
                      });
              })
              .catch((err) => {
                  res.status(500).json({
                      message: 'Failed to find advertisement',
                      error: err,
                  });
              });
      } catch (error) {
          console.error(error);
          res.status(500).json({
              message: 'Internal server error',
              error: error.message,
          });
      }
  }



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
}



  module.exports = {
      saveAdvertisement :saveAdvertisement,
      getAdvertisements:getAdvertisements
  };
