const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Category = require('./Category'); 

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Category', 
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true, 
    underscored: true,
    modelName: 'Product', 
  }
);


Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

module.exports = Product;