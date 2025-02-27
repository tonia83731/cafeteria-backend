"use strict";
module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define(
    "CartItem",
    {
      cartId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      size: DataTypes.INTEGER,
      ice: DataTypes.INTEGER,
      sugar: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    {
      modelName: "CartItem",
      tableName: "CartItems",
      underscored: true,
    }
  );
  CartItem.associate = function (models) {
    CartItem.belongsTo(models.Cart, {
      foreignKey: "cartId",
    });
    CartItem.belongsTo(models.Product, {
      foreignKey: "productId",
    });
  };
  return CartItem;
};
