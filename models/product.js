"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      title: DataTypes.JSON,
      description: DataTypes.JSON,
      price: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    {
      modelName: "Product",
      tableName: "Products",
      underscored: true,
    }
  );
  Product.associate = function (models) {
    // associations can be defined here
    Product.belongsTo(models.Category, {
      foreignKey: "categoryId",
    });
    Product.hasOne(models.SizeOptions, {
      foreignKey: "productId",
      as: "sizeOptions",
    });
    Product.hasOne(models.DrinkSugarOptions, {
      foreignKey: "productId",
      as: "sugarOptions",
    });
    Product.hasOne(models.DrinkIceOptions, {
      foreignKey: "productId",
      as: "iceOptions",
    });
  };
  return Product;
};
