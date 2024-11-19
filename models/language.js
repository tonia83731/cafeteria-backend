"use strict";
module.exports = (sequelize, DataTypes) => {
  const Language = sequelize.define(
    "Language",
    {
      code: DataTypes.STRING,
      title: DataTypes.STRING,
    },
    {
      modelName: "Language",
      tableName: "Languages",
      underscored: true,
    }
  );
  Language.associate = function (models) {
    Language.hasMany(models.User, {
      foreignKey: "languageId",
    });
  };
  return Language;
};
