"use strict";
module.exports = (sequelize, DataTypes) => {
  const Discount = sequelize.define(
    "Discount",
    {
      userId: DataTypes.INTEGER,
      couponId: DataTypes.INTEGER,
      isApplied: DataTypes.BOOLEAN,
    },
    {
      modelName: "Discount",
      tableName: "Discounts",
      underscored: true,
    }
  );
  Discount.associate = function (models) {
    Discount.belongsTo(models.User, {
      foreignKey: "userId",
    });
    Discount.belongsTo(models.Coupon, {
      foreignKey: "couponId",
    });
  };
  return Discount;
};
