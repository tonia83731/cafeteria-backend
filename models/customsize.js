"use strict";
module.exports = (sequelize, DataTypes) => {
  const CustomSize = sequelize.define(
    "CustomSize",
    {
      product_id: DataTypes.INTEGER,
      size_id: DataTypes.INTEGER,
    },
    {
      modelName: "CustomSize",
      tableName: "CustomSizes",
      underscored: true,
    }
  );
  CustomSize.associate = function (models) {
    // associations can be defined here
  };
  return CustomSize;
};
