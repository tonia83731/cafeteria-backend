"use strict";
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      code: DataTypes.STRING,
    },
    {
      modelName: "Category",
      tableName: "Categories",
      underscored: true,
    }
  );
  Category.associate = function (models) {
    // associations can be defined here
    Category.hasMany(models.Product, {
      foreignKey: "categoryId",
    });
  };
  return Category;
};
