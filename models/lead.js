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
        type: DataTypes.STRING,  // Make sure this field is defined
        allowNull: true,
      },
      to_location: DataTypes.STRING,
      to_location_area: {
        type: DataTypes.STRING,  // Make sure this field is defined
        allowNull: true,
      },
      car_model: DataTypes.STRING, // Add car_model here
      add_on: DataTypes.STRING, // Add car_model here
      fare: DataTypes.DECIMAL(10, 2), // Add fare here
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
