"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      userId: DataTypes.INTEGER,
      recipientName: DataTypes.STRING,
      recipientPhone: DataTypes.STRING,
      recipientAddress: DataTypes.STRING,
      shipping: DataTypes.JSON,
      payment: DataTypes.JSON,
      discountId: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      modelName: "Order",
      tableName: "Orders",
      underscored: true,
    }
  );
  Order.associate = function (models) {
    // associations can be defined here
    Order.hasMany(models.OrderItem, {
      foreignKey: "orderId",
    });
  };
  return Order;
};
