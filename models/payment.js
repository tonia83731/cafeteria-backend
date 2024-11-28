"use strict";
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "Payment",
    {
      title: DataTypes.JSON,
    },
    {
      modelName: "Payment",
      tableName: "Payments",
      underscored: true,
    }
  );
  Payment.associate = function (models) {
    Payment.hasMany(models.Order, {
      foreignKey: "paymentId",
    });
  };
  return Payment;
};
