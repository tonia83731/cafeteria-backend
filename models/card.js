"use strict";
module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define(
    "Card",
    {
      userId: DataTypes.INTEGER,
      cardNumber: DataTypes.STRING,
      cardType: DataTypes.INTEGER,
      expireationDate: DataTypes.DATE,
    },
    {
      modelName: "Card",
      tableName: "Cards",
      underscored: true,
    }
  );
  Card.associate = function (models) {
    // associations can be defined here
  };
  return Card;
};
