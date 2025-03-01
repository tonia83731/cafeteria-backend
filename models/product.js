"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      title: DataTypes.STRING,
      title_en: DataTypes.STRING,
      description: DataTypes.STRING,
      description_en: DataTypes.STRING,
      price: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      image: DataTypes.STRING,
      isPublished: DataTypes.BOOLEAN,
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
      as: "Carts",
    });
    Product.belongsTo(models.Category, {
      foreignKey: "categoryId",
    });
    Product.belongsToMany(models.Order, {
      through: models.OrderItem,
      foreignKey: "productId",
      otherKey: "orderId",
      as: "Orders",
    });
  };
  return Product;
};
