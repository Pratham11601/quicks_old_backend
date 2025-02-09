'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VendorDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  VendorDetails.init({
    fullname: DataTypes.STRING,
    phone: DataTypes.STRING,
    aadhaar_number: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.INTEGER,
    businessName:DataTypes.STRING,
    city:DataTypes.STRING,
    vendor_cat:DataTypes.STRING,
    profileImgUrl: DataTypes.STRING,
    documentImgUrl: DataTypes.STRING,
    licenseImgUrl: DataTypes.STRING,
    currentAddress: DataTypes.STRING,
    pin_code: DataTypes.STRING,
    carnumber: DataTypes.STRING,
    subscriptionPlan: DataTypes.STRING,
    subscription_date: DataTypes.DATE,
    sub_end_date: DataTypes.DATE,
    vendor_gender: DataTypes.STRING,
  }, {
    sequelize,
    // modelName: 'VendorDetails',
    tableName: 'vendordetails',
    timeStamps:false
  });
  return VendorDetails;
};