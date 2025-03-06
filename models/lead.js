'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Lead extends Model {
    static associate(models) {
    
    }
  }

  Lead.init(
    {
      date: DataTypes.STRING,
      vendor_id: DataTypes.INTEGER,
      vendor_name: DataTypes.STRING,
      location_from: DataTypes.STRING,
      location_from_area: {
        type: DataTypes.STRING,  
        allowNull: true,
      },
      to_location: DataTypes.STRING,
      to_location_area: {
        type: DataTypes.STRING,  
        allowNull: true,
      },
      car_model: DataTypes.STRING,
      add_on: DataTypes.STRING, 
      fare: DataTypes.DECIMAL(10, 2), 
      time: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN,
      vendor_contact: DataTypes.STRING,
      vendor_cat: DataTypes.STRING,
    },
    {
      sequelize,
    //   modelName: 'Lead',
    tableName: 'leads'
    }
  );

  return Lead;
};