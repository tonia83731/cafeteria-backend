"use strict";
module.exports = (sequelize, DataTypes) => {
  const Shipping = sequelize.define(
    "Shipping",
    {
      method: DataTypes.STRING,
      methodEn: DataTypes.STRING,
      price: DataTypes.INTEGER,
    },
    {
      modelName: "Shipping",
      tableName: "Shippings",
      underscored: true,
    }
  );
  Shipping.associate = function (models) {
    // associations can be defined here
  };
  return Shipping;
};
