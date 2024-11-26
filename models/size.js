"use strict";
module.exports = (sequelize, DataTypes) => {
  const Size = sequelize.define(
    "Size",
    {
      title: DataTypes.JSON,
      price: DataTypes.INTEGER,
    },
    {
      modelName: "Size",
      tableName: "Sizes",
      underscored: true,
    }
  );
  Size.associate = function (models) {
    // associations can be defined here
    Size.hasMany(models.CartItem, {
      foreignKey: "sizeId",
    });
  };
  return Size;
};
