"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      account: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
      language: DataTypes.STRING,
      invoice: DataTypes.STRING,
    },
    {
      modelName: "User",
      tableName: "Users",
      underscored: true,
    }
  );
  User.associate = function (models) {
    User.belongsToMany(models.Product, {
      through: models.Wish,
      foreignKey: "userId",
      otherKey: "productId",
      as: "wishedProducts",
    });
    User.hasMany(models.Order, {
      foreignKey: "userId",
      as: "orders",
    });
    User.belongsToMany(models.Product, {
      through: models.Cart,
      foreignKey: "userId",
      otherKey: "productId",
      as: "cartProducts",
    });
  };
  return User;
};
