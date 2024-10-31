"use strict";
module.exports = (sequelize, DataTypes) => {
  const SugarOptions = sequelize.define(
    "SugarOptions",
    {
      productId: DataTypes.INTEGER,
      sugarId: DataTypes.INTEGER,
    },
    {
      modelName: "SugarOptions",
      tableName: "SugarOptions",
      underscored: true,
    }
  );
  SugarOptions.associate = function (models) {
    // associations can be defined here
    SugarOptions.hasMany(models.CartItem, {
      foreignKey: "sugarOptionId",
    });
    SugarOptions.hasMany(models.OrderItem, {
      foreignKey: "sugarOptionId",
    });
  };
  return SugarOptions;
};
