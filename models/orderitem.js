"use strict";
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      orderId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      sizeOptionId: DataTypes.INTEGER,
      iceOptionId: DataTypes.INTEGER,
      sugarOptionId: DataTypes.INTEGER,
    },
    {
      modelName: "OrderItem",
      tableName: "OrderItems",
      underscored: true,
    }
  );
  OrderItem.associate = function (models) {
    // associations can be defined here
    OrderItem.belongsTo(models.Order, {
      foreignKey: "orderId",
    });
    OrderItem.belongsTo(models.SizeOptions, {
      foreignKey: "sizeOptionId",
    });
    OrderItem.belongsTo(models.IceOptions, {
      foreignKey: "iceOptionId",
    });
    OrderItem.belongsTo(models.SugarOptions, {
      foreignKey: "sugarOptionId",
    });
  };
  return OrderItem;
};
