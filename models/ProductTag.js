const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Product', // Use the model name to reference the table
        key: 'id',
      },
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Tag', // Use the model name to reference the table
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true, // Ensure Sequelize uses the table name as specified
    underscored: true,
    modelName: 'ProductTag', // This will be converted to "product_tags"
  }
);

module.exports = ProductTag;