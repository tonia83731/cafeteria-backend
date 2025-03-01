"use strict";
module.exports = (sequelize, DataTypes) => {
  const Coupon = sequelize.define(
    "Coupon",
    {
      title: DataTypes.STRING,
      title_en: DataTypes.STRING,
      description: DataTypes.STRING,
      description_en: DataTypes.STRING,
      code: DataTypes.STRING,
      endDate: DataTypes.INTEGER,
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
