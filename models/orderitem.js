"use strict";
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      orderId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      size: DataTypes.INTEGER,
      ice: DataTypes.INTEGER,
      sugar: DataTypes.INTEGER,
      itemPrice: DataTypes.INTEGER,
    },
    {
      modelName: "OrderItem",
      tableName: "OrderItems",
      underscored: true,
    }
  );
  OrderItem.associate = function (models) {
   
  };
  return OrderItem;
};
