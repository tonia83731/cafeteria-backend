"use strict";
module.exports = (sequelize, DataTypes) => {
  const Discount = sequelize.define(
    "Discount",
    {
      userId: DataTypes.INTEGER,
      cuponId: DataTypes.INTEGER,
      usedAt: DataTypes.DATE,
    },
    {
      modelName: "Discount",
      tableName: "Discounts",
      underscored: true,
    }
  );
  Discount.associate = function (models) {
    // associations can be defined here
  };
  return Discount;
};
