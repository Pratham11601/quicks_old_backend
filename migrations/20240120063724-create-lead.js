'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Leads', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.STRING
      },
      vendor_id: {
        type: Sequelize.INTEGER
      },
      vendor_name: {
        type: Sequelize.STRING
      },
      location_from: {
        type: Sequelize.STRING
      },
      location_from_area: {
        type: DataTypes.STRING,  // Make sure this field is defined
        allowNull: true,
      },
      to_location: {
        type: Sequelize.STRING
      },
      to_location_area: {
        type: DataTypes.STRING,  // Make sure this field is defined
        allowNull: true,
      },
      car_model: {
        type: Sequelize.STRING // Add car_model here
      },
      add_on: {
        type: Sequelize.STRING // Add car_model here
      },
      fare: {
        type: Sequelize.DECIMAL(10, 2) // Add fare here
      },
      time: {
        type: Sequelize.STRING
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true, 
      },
      vendor_contact: {
        type: Sequelize.STRING
      },
      vendor_cat: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

 
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Leads');
  }
};