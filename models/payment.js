"use strict";
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "Payment",
    {
      method: DataTypes.STRING,
      methodEn: DataTypes.STRING,
    },
    {
      modelName: "Payment",
      tableName: "Payments",
      underscored: true,
    }
  );
  Payment.associate = function (models) {
    // associations can be defined here
  };
  return Payment;
};
