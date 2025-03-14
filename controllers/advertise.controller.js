  const models = require('../models');
  const path = require('path');
  const fs = require('fs').promises;

  async function saveAdvertisement   (req, res)  {
    try {
        const { name, url } = req.body;

       
        const imagePath = req.file ? req.file.path : null;

        const newAdvertise = await models.advertise.create({
            image: imagePath, 
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
                id: ad.id,
                image: ad.image || " ", 
                postedFrom: ad.name || " ", 
                date: ad.createdAt || " ", 

               

            };
        });

        res.status(200).json(
           
            formattedAdvertisements
        
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
  };


  async function deleteAdvertisement(req, res) {
    try {
        const { id } = req.params; 

        const advertisement = await models.advertise.findByPk(id);

        if (!advertisement) {
            return res.status(404).json({
                success: false,
                message: 'Advertisement not found'
            });
        }

        await advertisement.destroy();

        return res.status(200).json({
            success: true,
            message: 'Advertisement deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting advertisement:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}



  module.exports = {
      saveAdvertisement :saveAdvertisement,
      deleteAdvertisement :deleteAdvertisement,
      getAdvertisements:getAdvertisements
  };
