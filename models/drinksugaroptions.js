"use strict";
module.exports = (sequelize, DataTypes) => {
  const DrinkSugarOptions = sequelize.define(
    "DrinkSugarOptions",
    {
      productId: DataTypes.INTEGER,
      options: DataTypes.JSON,
    },
    {
      modelName: "DrinkSugarOption",
      tableName: "DrinkSugarOptions",
      underscored: true,
    }
  );
  DrinkSugarOptions.associate = function (models) {
    DrinkSugarOptions.belongsTo(models.Product, { foreignKey: "productId" });
  };
  return DrinkSugarOptions;
};
