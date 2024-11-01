"use strict";
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      userId: DataTypes.INTEGER,
    },
    {
      modelName: "Cart",
      tableName: "Carts",
      underscored: true,
    }
  );
  Cart.associate = function (models) {
    // associations can be defined here
    Cart.belongsTo(models.User, {
      foreignKey: "userId",
    });
    Cart.hasMany(models.CartItem, {
      foreignKey: "cartId",
    });
  };
  return Cart;
};
