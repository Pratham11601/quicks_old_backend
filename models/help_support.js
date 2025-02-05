'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class help_support extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  help_support.init({
    query_message: DataTypes.TEXT,
    vendor_category: DataTypes.STRING,
    vendor_id: DataTypes.INTEGER,
    vendor_contact: DataTypes.STRING,
    vendor_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'help_support',
  });
  return help_support;
};