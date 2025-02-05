'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('VendorDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullname: {
        type: Sequelize.STRING
      },
      vendor_cat: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
      },
      phone: {
        type: Sequelize.STRING
      },
      aadhaar_number: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      profileImgUrl: {
        type: Sequelize.STRING
      },
      documentImgUrl: {
        type: Sequelize.STRING
      },
      licenseImgUrl: {
        type: Sequelize.STRING
      },
      currentAddress: {
        type: Sequelize.STRING
      },
      pin_code: {
        type: Sequelize.STRING
      },
      carnumber: {
        type: Sequelize.STRING
      },
      businessName: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      vendor_gender: {
        type: Sequelize.STRING
      },
      subscriptionPlan: {
        type: Sequelize.STRING
      },
      subscription_date: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      hooks: {
          beforeCreate: (lead, options) => {
              const currentTime = new Date();
              const leadTime = new Date(lead.createdAt);
  
              if ((currentTime - leadTime) / (1000 * 60 * 60) > 1) {
                  lead.is_active = false;
              }
          },
      },
  });
    
    
    
    
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('VendorDetails');
  }
};