"use strict";
module.exports = (sequelize, DataTypes) => {
  const Cupon = sequelize.define(
    "Cupon",
    {
      title: DataTypes.STRING,
      titleEn: DataTypes.STRING,
      description: DataTypes.TEXT,
      descriptionEn: DataTypes.TEXT,
      code: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      discountType: DataTypes.STRING,
      discountValue: DataTypes.INTEGER,
      targetCategoryId: DataTypes.INTEGER,
      targetProductId: DataTypes.INTEGER,
    },
    {
      modelName: "Cupon",
      tableName: "Cupons",
      underscored: true,
    }
  );
  Cupon.associate = function (models) {
    // associations can be defined here
    Cupon.belongsTo(models.Category, {
      foreignKey: "targetCategoryId",
      as: "Category",
    });
    Cupon.belongsTo(models.Product, {
      foreignKey: "targetProductId",
      as: "Product",
    });
    Cupon.belongsToMany(models.User, {
      through: models.Discount,
      foreignKey: "cuponId",
      as: "DiscountUsers",
    });
  };
  return Cupon;
};
