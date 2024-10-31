"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      userId: DataTypes.INTEGER,
      recipientName: DataTypes.STRING,
      recipientPhone: DataTypes.STRING,
      recipientAddress: DataTypes.STRING,
      shippingId: DataTypes.INTEGER,
      paymentId: DataTypes.INTEGER,
      discountId: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER,
    },
    {
      modelName: "Order",
      tableName: "Orders",
      underscored: true,
    }
  );
  Order.associate = function (models) {
    // associations can be defined here
  };
  return Order;
};
