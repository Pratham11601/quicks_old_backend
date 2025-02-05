'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vendor_cat: {
        type: Sequelize.STRING
      },
      date: {
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
      vendor_cat_id: {
        type: Sequelize.INTEGER
      },
      vendor_id: {
        type: Sequelize.INTEGER
      },
      vendor_name: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.STRING
      },
      is_active: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Posts');
  }
};