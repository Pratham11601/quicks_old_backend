'use strict';
module.exports = (sequelize, DataTypes) => {
  const RzpKey = sequelize.define('RzpKey', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    rzp_key: {
      type: DataTypes.STRING(255),
      allowNull: true, // This column is nullable
      defaultValue: null, // Default value is null
    },
  }, {
    tableName: 'rzp_key', // Ensure the table name matches the one defined in the migration
    timestamps: false, // Disable timestamps (createdAt, updatedAt)
  });

  return RzpKey;
};
