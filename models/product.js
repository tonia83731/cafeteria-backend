"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      title: DataTypes.STRING,
      titleEn: DataTypes.STRING,
      description: DataTypes.TEXT,
      descriptionEn: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
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
      as: "Category",
    });
    Product.hasMany(models.Cupon, {
      foreignKey: "targetProductId",
    });
    Product.belongsToMany(models.User, {
      through: models.Wish,
      foreignKey: "productId",
      as: "WishedUsers",
    });
    Product.belongsToMany(models.Size, {
      through: models.SizeOptions,
      foreignKey: "productId",
      as: "ProductSizes",
    });
    Product.belongsToMany(models.Sugar, {
      through: models.SugarOptions,
      foreignKey: "productId",
      as: "ProductSugars",
    });
    Product.belongsToMany(models.Ice, {
      through: models.IceOptions,
      foreignKey: "productId",
      as: "ProductIce",
    });
  };
  return Product;
};
