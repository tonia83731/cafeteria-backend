"use strict";
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      code: DataTypes.STRING,
      includeOption: DataTypes.BOOLEAN,
    },
    {
      modelName: "Category",
      tableName: "Categories",
      underscored: true,
    }
  );
  Category.associate = function (models) {
    Category.hasMany(models.Product, {
      foreignKey: "categoryId",
      as: "products",
    });
  };
  return Category;
};
