"use strict";
module.exports = (sequelize, DataTypes) => {
  const Coupon = sequelize.define(
    "Coupon",
    {
      title: DataTypes.JSON,
      description: DataTypes.JSON,
      code: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      discountType: DataTypes.STRING,
      discountValue: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      minSpend: DataTypes.INTEGER,
      isPublished: DataTypes.BOOLEAN,
    },
    {
      modelName: "Coupon",
      tableName: "Coupons",
      underscored: true,
    }
  );
  Coupon.associate = function (models) {
    // associations can be defined here
    Coupon.hasMany(models.Discount, {
      foreignKey: "couponId",
    });
  };
  return Coupon;
};
