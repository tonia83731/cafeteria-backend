"use strict";
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      code: DataTypes.STRING,
      hasOpts: DataTypes.BOOLEAN,
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
    });
  };
  return Category;
};
