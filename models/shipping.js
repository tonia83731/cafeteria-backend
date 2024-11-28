"use strict";
module.exports = (sequelize, DataTypes) => {
  const Shipping = sequelize.define(
    "Shipping",
    {
      title: DataTypes.JSON,
      price: DataTypes.INTEGER,
    },
    {
      modelName: "Shipping",
      tableName: "Shippings",
      underscored: true,
    }
  );
  Shipping.associate = function (models) {
    Shipping.hasMany(models.Order, {
      foreignKey: "shippingId",
    });
  };
  return Shipping;
};
