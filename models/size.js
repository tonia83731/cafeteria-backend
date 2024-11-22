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
    Size.belongsToMany(models.Product, {
      through: models.CustomSize,
      foreignKey: "sizeId",
      as: "AvailableSizesForProduct",
    });
  };
  return Size;
};
