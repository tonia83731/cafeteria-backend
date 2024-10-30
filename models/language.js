"use strict";
module.exports = (sequelize, DataTypes) => {
  const Language = sequelize.define(
    "Language",
    {
      code: DataTypes.STRING,
    },
    {
      modelName: "Language",
      tableName: "Languages",
      underscored: true,
    }
  );
  Language.associate = function (models) {
    Language.hasMany(models.User, {
      foreignKey: "perferenceLangaugeId",
      // as: "Users",
    });
  };
  // Language.init({
  //   code: DataTypes.STRING,
  // },
  //   {
  //     sequelize,
  //     modelName: "User",
  //     tableName: "Users",
  //     underscored: true,
  //   });
  return Language;
};
