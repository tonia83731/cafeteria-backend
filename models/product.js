"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      title: DataTypes.STRING,
      titleEn: DataTypes.STRING,
      description: DataTypes.STRING,
      descriptionEn: DataTypes.STRING,
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
    // product ⇌ category
    Product.belongsTo(models.Category, {
      foreignKey: "categoryId",
      as: "category",
    });
    // product ⇌ wish ⇌ user
    Product.belongsToMany(models.User, {
      through: models.Wish,
      foreignKey: "productId",
      otherKey: "userId",
      as: "wishedUsers",
    });
    // product ⇌ cart
    Product.belongsToMany(models.User, {
      through: models.Cart,
      foreignKey: "productId",
      otherKey: "userId",
      as: "cartUsers",
    });
    // product ⇌ orderitem ⇌ order
    Product.belongsToMany(models.Order, {
      through: models.OrderItem,
      foreignKey: "productId",
      otherKey: "orderId",
      as: "orders",
    });
  };
  return Product;
};
