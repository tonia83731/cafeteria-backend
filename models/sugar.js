"use strict";
module.exports = (sequelize, DataTypes) => {
  const Sugar = sequelize.define(
    "Sugar",
    {
      title: DataTypes.JSON,
    },
    {
      modelName: "Sugar",
      tableName: "Sugars",
      underscored: true,
    }
  );
  Sugar.associate = function (models) {
    Sugar.belongsToMany(models.Product, {
      through: models.CustomSugar,
      foreignKey: "sugarId",
      as: "AvailableSigarForProduct",
    });
  };
  return Sugar;
};
