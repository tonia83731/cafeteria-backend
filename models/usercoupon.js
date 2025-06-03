'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserCoupon = sequelize.define('UserCoupon', {
    userId: DataTypes.INTEGER,
    couponId: DataTypes.INTEGER,
    isUsed: DataTypes.BOOLEAN
  }, {});
  UserCoupon.associate = function(models) {
   
  };
  return UserCoupon;
};