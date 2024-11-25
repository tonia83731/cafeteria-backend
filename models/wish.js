"use strict";
module.exports = (sequelize, DataTypes) => {
  const Wish = sequelize.define(
    "Wish",
    {
      userId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
    },
    {
      modelName: "Wish",
      tableName: "Wishes",
      underscored: true,
    }
  );
  Wish.associate = function (models) {
    // associations can be defined here
  };
  return Wish;
};
