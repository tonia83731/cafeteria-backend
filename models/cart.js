"use strict";
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      userId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      size: DataTypes.INTEGER,
      ice: DataTypes.INTEGER,
      sugar: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    {
      modelName: "Cart",
      tableName: "Carts",
      underscored: true,
    }
  );
  Cart.associate = function (models) {};
  return Cart;
};
