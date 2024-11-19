"use strict";
module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define(
    "CartItem",
    {
      cartId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      size: DataTypes.JSON,
      ice: DataTypes.JSON,
      sugar: DataTypes.JSON,
      subPrice: DataTypes.INTEGER,
    },
    {
      modelName: "CartItem",
      tableName: "CartItems",
      underscored: true,
    }
  );
  CartItem.associate = function (models) {
    // associations can be defined here
    CartItem.hasMany(models.Cart, {
      foreignKey: "cartId",
    });
  };
  return CartItem;
};
