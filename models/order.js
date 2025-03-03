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
      discountId: DataTypes.INTEGER,
      discountPrice: DataTypes.INTEGER,
      tax: DataTypes.INTEGER,
      productPrice: DataTypes.INTEGER,
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
