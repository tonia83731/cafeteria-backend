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
    Product.belongsToMany(models.User, {
      through: models.Wish,
      foreignKey: "productId",
      as: "WishedUsers",
    });
    Product.belongsToMany(models.Cart, {
      through: models.CartItem,
      foreignKey: "productId",
      otherKey: "cartId",
      as: "Carts", // Alias for associated carts
    });
    Product.belongsTo(models.Category, {
      foreignKey: "categoryId",
    });
    // Product.belongsToMany(models.Size, {
    //   through: models.CustomSize,
    //   foreignKey: "productId",
    //   as: "ProductSizeOptions",
    // });
    // Product.belongsToMany(models.Ice, {
    //   through: models.CustomIce,
    //   foreignKey: "productId",
    //   as: "ProductIceOptions",
    // });
    // Product.belongsToMany(models.Sugar, {
    //   through: models.CustomSugar,
    //   foreignKey: "productId",
    //   as: "ProductSugarOptions",
    // });
  };
  return Product;
};
