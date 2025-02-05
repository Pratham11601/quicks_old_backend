'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init({
    vendor_cat: DataTypes.STRING,
    date: DataTypes.STRING,
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
    vendor_cat_id: DataTypes.INTEGER,
    vendor_id: DataTypes.INTEGER,
    vendor_name: DataTypes.STRING,
    time: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};