"use strict";
module.exports = (sequelize, DataTypes) => {
  const SizeOptions = sequelize.define(
    "SizeOptions",
    {
      productId: DataTypes.INTEGER,
      options: DataTypes.JSON,
    },
    {
      modelName: "SizeOption",
      tableName: "SizeOptions",
      underscored: true,
    }
  );
  SizeOptions.associate = function (models) {
    // associations can be defined here
    SizeOptions.belongsTo(models.Product, { foreignKey: "productId" });
  };
  return SizeOptions;
};
