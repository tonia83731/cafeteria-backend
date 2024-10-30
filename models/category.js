"use strict";
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      name: DataTypes.STRING,
      nameEn: DataTypes.STRING,
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
    Category.hasMany(models.Cupon, {
      foreignKey: "targetCategoryId",
    });
  };
  return Category;
};
