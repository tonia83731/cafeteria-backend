"use strict";
module.exports = (sequelize, DataTypes) => {
  const Size = sequelize.define(
    "Size",
    {
      name: DataTypes.STRING,
      nameEn: DataTypes.STRING,
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
      through: models.SizeOptions,
      foreignKey: "sizeId",
      as: "SizeProducts",
    });
  };
  return Size;
};
