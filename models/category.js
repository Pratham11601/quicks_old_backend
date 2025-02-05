module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      cat_name: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true,
      },
    }, {
      tableName: 'category',
      timestamps: true, // This will create createdAt and updatedAt fields automatically
    });
  
    return Category;
  };
  