"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      userId: DataTypes.INTEGER,
      recipientName: DataTypes.STRING,
      recipientPhone: DataTypes.STRING,
      recipientAddress: DataTypes.STRING,
      shipping: DataTypes.INTEGER,
      payment: DataTypes.INTEGER,
      userCouponId: DataTypes.INTEGER,
      discountAmount: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
    },
    {
      modelName: "Order",
      tableName: "Orders",
      underscored: true,
    }
  );
  Order.associate = function (models) {
    
  };
  return Order;
};
