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
    Product.belongsToMany(models.Size, {
      through: models.CustomSize,
      foreignKey: "productId",
      as: "ProductSizeOptions",
    });
    Product.belongsToMany(models.Ice, {
      through: models.CustomIce,
      foreignKey: "productId",
      as: "ProductIceOptions",
    });
    Product.belongsToMany(models.Sugar, {
      through: models.CustomSugar,
      foreignKey: "productId",
      as: "ProductSugarOptions",
    });
  };
  return Product;
};
