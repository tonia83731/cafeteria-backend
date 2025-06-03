"use strict";
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      userId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      sizeId: DataTypes.INTEGER,
      ice: DataTypes.INTEGER,
      sugar: DataTypes.INTEGER,
      itemTotal: DataTypes.INTEGER,
    },
    {
      modelName: "Cart",
      tableName: "Carts",
      underscored: true,
    }
  );
  Cart.associate = function (models) {
    
  };
  return Cart;
};
