'use strict';
module.exports = (sequelize, DataTypes) => {
  const Coupon = sequelize.define('Coupon', {
    code: DataTypes.STRING,
    description: DataTypes.STRING,
    descriptionEn: DataTypes.STRING,
    discountType: DataTypes.INTEGER,
    discountValue: DataTypes.DECIMAL,
    expiryDate: DataTypes.DATE,
    isActive: DataTypes.BOOLEAN
  }, {
    modelName: "Coupon",
    tableName: "Coupons",
    underscored: true,
  });
  Coupon.associate = function(models) {
    
  };
  return Coupon;
};