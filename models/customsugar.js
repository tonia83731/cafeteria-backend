"use strict";
module.exports = (sequelize, DataTypes) => {
  const CustomSugar = sequelize.define(
    "CustomSugar",
    {
      productId: DataTypes.INTEGER,
      sugarId: DataTypes.INTEGER,
    },
    {
      modelName: "CustomSugar",
      tableName: "CustomSugars",
      underscored: true,
    }
  );
  CustomSugar.associate = function (models) {
    // associations can be defined here
  };
  return CustomSugar;
};
