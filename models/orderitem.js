"use strict";
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      orderId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      size: DataTypes.JSON,
      ice: DataTypes.JSON,
      sugar: DataTypes.JSON,
      subPrice: DataTypes.INTEGER,
    },
    {
      modelName: "OrderItem",
      tableName: "OrderItems",
      underscored: true,
    }
  );
  OrderItem.associate = function (models) {
    // associations can be defined here
    OrderItem.hasMany(models.Order, {
      foreignKey: "orderId",
    });
  };
  return OrderItem;
};
