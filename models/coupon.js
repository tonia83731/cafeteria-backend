"use strict";
module.exports = (sequelize, DataTypes) => {
  const Coupon = sequelize.define(
    "Coupon",
    {
      title: DataTypes.JSON,
      description: DataTypes.JSON,
      code: DataTypes.STRING,
      endDate: DataTypes.DATE,
      discountType: DataTypes.STRING,
      discountValue: DataTypes.INTEGER,
      isPublished: DataTypes.BOOLEAN,
    },
    {
      modelName: "Coupon",
      tableName: "Coupons",
      underscored: true,
    }
  );
  Coupon.associate = function (models) {
    Coupon.hasMany(models.Discount, {
      foreignKey: "couponId",
    });
  };
  return Coupon;
};
