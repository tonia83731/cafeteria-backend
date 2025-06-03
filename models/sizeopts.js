"use strict";
module.exports = (sequelize, DataTypes) => {
  const SizeOpt = sequelize.define(
    "SizeOpt",
    {
      code: DataTypes.STRING,
      price_addon: DataTypes.STRING,
    },
    {
      modelName: "SizeOpt",
      tableName: "SizeOpts",
      underscored: true,
    }
  );
  SizeOpt.associate = function (models) {
    
  };
  return SizeOpt;
};
