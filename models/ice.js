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
    Ice.hasMany(models.CartItem, {
      foreignKey: "iceId",
    });
    Ice.hasMany(models.OrderItem, {
      foreignKey: "iceId",
    });
  };
  return Ice;
};
