'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class advertise extends Model {
    /**
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  advertise.init({
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    banner_add_date: DataTypes.DATE,
    banner_end_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'advertise',
  });
  return advertise;
};