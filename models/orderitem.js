"use strict";
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      orderId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      sizeId: DataTypes.INTEGER,
      iceId: DataTypes.INTEGER,
      sugarId: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    {
      modelName: "OrderItem",
      tableName: "OrderItems",
      underscored: true,
    }
  );
  OrderItem.associate = function (models) {
    OrderItem.belongsTo(models.Product, {
      foreignKey: "productId",
    });
    OrderItem.belongsTo(models.Order, {
      foreignKey: "orderId",
    });
  };
  return OrderItem;
};
