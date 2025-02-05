'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('help_supports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      query_message: {
        type: Sequelize.TEXT
      },
      vendor_category: {
        type: Sequelize.STRING
      },
      vendor_id: {
        type: Sequelize.INTEGER
      },
      vendor_contact: {
        type: Sequelize.STRING
      },
      vendor_name: {
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
    await queryInterface.dropTable('help_supports');
  }
};