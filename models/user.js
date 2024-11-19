"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      note: DataTypes.TEXT,
      image: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
      languageId: DataTypes.INTEGER,
    },
    {
      modelName: "User",
      tableName: "Users",
      underscored: true,
    }
  );
  User.associate = function (models) {
    // associations can be defined here
    User.belongsTo(models.Language, {
      foreignKey: "languageId",
    });
    User.hasMany(models.Discount, {
      foreignKey: "userId",
    });
    User.hasOne(models.Cart, {
      foreignKey: "userId",
    });
  };
  return User;
};
