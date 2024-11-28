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
    Sugar.hasMany(models.CartItem, {
      foreignKey: "sugarId",
    });
    Sugar.hasMany(models.OrderItem, {
      foreignKey: "sugarId",
    });
  };
  return Sugar;
};
