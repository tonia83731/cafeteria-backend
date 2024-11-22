"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
      language: DataTypes.STRING,
    },
    {
      modelName: "User",
      tableName: "Users",
      underscored: true,
    }
  );
  User.associate = function (models) {
    User.hasMany(models.Discount, {
      foreignKey: "userId",
    });
    User.hasOne(models.Cart, {
      foreignKey: "userId",
    });
  };
  return User;
};
