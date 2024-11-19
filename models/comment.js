"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      rate: DataTypes.FLOAT,
      comment: DataTypes.TEXT,
    },
    {
      modelName: "Comment",
      tableName: "Comments",
      underscored: true,
    }
  );
  Comment.associate = function (models) {
    // associations can be defined here
  };
  return Comment;
};
