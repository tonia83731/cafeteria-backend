"use strict";
module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define(
    "Card",
    {
      userId: DataTypes.INTEGER,
      cardNumber: DataTypes.STRING,
      cardType: DataTypes.INTEGER,
      expirationDate: DataTypes.DATE,
    },
    {
      modelName: "Card",
      tableName: "Cards",
      underscored: true,
    }
  );
  Card.associate = function (models) {
    Card.belongsTo(models.User, {
      foreignKey: "userId",
    });
  };
  return Card;
};
