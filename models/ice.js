"use strict";
module.exports = (sequelize, DataTypes) => {
  const Ice = sequelize.define(
    "Ice",
    {
      name: DataTypes.STRING,
      nameEn: DataTypes.STRING,
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
      through: models.IceOptions,
      foreignKey: "iceId",
      as: "IceProducts",
    });
  };
  return Ice;
};
