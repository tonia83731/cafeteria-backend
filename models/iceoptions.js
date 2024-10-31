"use strict";
module.exports = (sequelize, DataTypes) => {
  const IceOptions = sequelize.define(
    "IceOptions",
    {
      productId: DataTypes.INTEGER,
      iceId: DataTypes.INTEGER,
    },
    {
      modelName: "IceOptions",
      tableName: "IceOptions",
      underscored: true,
    }
  );
  IceOptions.associate = function (models) {
    // associations can be defined here
    IceOptions.hasMany(models.CartItem, {
      foreignKey: "iceOptionId",
    });
    IceOptions.hasMany(models.OrdertItem, {
      foreignKey: "iceOptionId",
    });
  };
  return IceOptions;
};
