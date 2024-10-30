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
      perferenceLangaugeId: DataTypes.INTEGER,
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
      foreignKey: "perferenceLangaugeId",
      as: "PreferredLanguage",
    });
    User.belongsToMany(models.Cupon, {
      through: models.Discount,
      foreignKey: "userId",
      as: "DiscountCupons",
    });
    User.belongsToMany(models.Product, {
      through: models.Wish,
      foreignKey: "userId",
      as: "WishedProducts",
    });
    User.belongsTo(models.Cart, {
      foreignKey: "userId",
    });
  };
  // User.init(
  //   {
  //     name: DataTypes.STRING,
  //     email: DataTypes.STRING,
  //     password: DataTypes.STRING,
  //     note: DataTypes.TEXT,
  //     image: DataTypes.STRING,
  //     isAdmin: DataTypes.BOOLEAN,
  //     perferenceLangaugeId: DataTypes.INTEGER,
  //   },
  //   {
  //     sequelize,
  //     modelName: "User",
  //     tableName: "Users",
  //   }
  // );
  return User;
};
