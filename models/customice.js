"use strict";
module.exports = (sequelize, DataTypes) => {
  const CustomIce = sequelize.define(
    "CustomIce",
    {
      productId: DataTypes.INTEGER,
      iceId: DataTypes.INTEGER,
    },
    {
      modelName: "CustomIce",
      tableName: "CustomIce",
      underscored: true,
    }
  );
  CustomIce.associate = function (models) {
    // associations can be defined here
  };
  return CustomIce;
};
