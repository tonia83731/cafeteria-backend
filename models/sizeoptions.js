"use strict";
module.exports = (sequelize, DataTypes) => {
  const SizeOptions = sequelize.define(
    "SizeOptions",
    {
      productId: DataTypes.INTEGER,
      sizeId: DataTypes.INTEGER,
    },
    {
      modelName: "SizeOptions",
      tableName: "SizeOptions",
      underscored: true,
    }
  );
  SizeOptions.associate = function (models) {
    // associations can be defined here
    SizeOptions.hasMany(models.CartItem, {
      foreignKey: "sizeOptionId",
    });
    SizeOptions.hasMany(models.OrderItem, {
      foreignKey: "sizeOptionId",
    });
  };
  return SizeOptions;
};
