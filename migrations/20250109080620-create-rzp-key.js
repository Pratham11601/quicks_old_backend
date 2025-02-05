'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rzp_key', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      rzp_key: {
        type: Sequelize.STRING(255),
        allowNull: true, // This is the nullable column
        defaultValue: null, // Default value is null
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('rzp_key');
  }
};
