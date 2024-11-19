"use strict";
module.exports = (sequelize, DataTypes) => {
  const DrinkIceOptions = sequelize.define(
    "DrinkIceOptions",
    {
      productId: DataTypes.INTEGER,
      options: DataTypes.JSON,
    },
    {
      modelName: "DrinkIceOption",
      tableName: "DrinkIceOptions",
      underscored: true,
    }
  );
  DrinkIceOptions.associate = function (models) {
    // associations can be defined here
    DrinkIceOptions.belongsTo(models.Product, { foreignKey: "productId" });
  };
  return DrinkIceOptions;
};
