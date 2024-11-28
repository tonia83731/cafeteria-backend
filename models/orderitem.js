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
    OrderItem.belongsTo(models.Order, {
      foreignKey: "orderId",
    });
    OrderItem.belongsTo(models.Size, {
      foreignKey: "sizeId",
    });
    OrderItem.belongsTo(models.Sugar, {
      foreignKey: "sugarId",
    });
    OrderItem.belongsTo(models.Ice, {
      foreignKey: "iceId",
    });
    OrderItem.belongsTo(models.Product, {
      foreignKey: "productId",
    });
  };
  return OrderItem;
};
