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
      status: DataTypes.STRING,
    },
    {
      modelName: "Order",
      tableName: "Orders",
      underscored: true,
    }
  );
  Order.associate = function (models) {
    Order.hasMany(models.OrderItem, {
      foreignKey: "orderId",
    });
    Order.belongsToMany(models.Product, {
      through: models.OrderItem,
      foreignKey: "orderId",
      otherKey: "productId",
      as: "Products",
    });
    Order.belongsTo(models.Discount, {
      foreignKey: "discountId",
    });
    Order.belongsTo(models.User, {
      foreignKey: "userId",
    });
  };
  return Order;
};
