"use strict";
module.exports = (sequelize, DataTypes) => {
  const Sugar = sequelize.define(
    "Sugar",
    {
      name: DataTypes.STRING,
      nameEn: DataTypes.STRING,
    },
    {
      modelName: "Sugar",
      tableName: "Sugars",
      underscored: true,
    }
  );
  Sugar.associate = function (models) {
    // associations can be defined here
    Sugar.belongsToMany(models.Product, {
      through: models.SugarOptions,
      foreignKey: "sugarId",
      as: "SugarProducts",
    });
  };
  return Sugar;
};
