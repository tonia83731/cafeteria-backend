"use strict";
module.exports = (sequelize, DataTypes) => {
  const Ice = sequelize.define(
    "Ice",
    {
      title: DataTypes.JSON,
    },
    {
      modelName: "Ice",
      tableName: "Ice",
      underscored: true,
    }
  );
  Ice.associate = function (models) {
    // associations can be defined here
    Ice.belongsToMany(models.Product, {
      through: models.CustomIce,
      foreignKey: "iceId",
      as: "AvailableIceForProduct",
    });
  };
  return Ice;
};
