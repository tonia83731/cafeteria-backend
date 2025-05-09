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
      total: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
    },
    {
      modelName: "Order",
      tableName: "Orders",
      underscored: true,
    }
  );
  Order.associate = function (models) {
    // order ⇌ user
    Order.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
    // order ⇌ orderitem ⇌ product
    Order.belongsToMany(models.Product, {
      through: models.OrderItem,
      foreignKey: "orderId",
      otherKey: "productId",
      as: "products",
    });
    // order ⇌ orderitem
    Order.hasMany(models.OrderItem, {
      foreignKey: "orderId",
      as: "orderItems",
    });
  };
  return Order;
};
