"use strict";
module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define(
    "CartItem",
    {
      cartId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      sizeOptionId: DataTypes.INTEGER,
      iceOptionId: DataTypes.INTEGER,
      sugarOptionId: DataTypes.INTEGER,
    },
    {
      modelName: "CartItem",
      tableName: "CartItems",
      underscored: true,
    }
  );
  CartItem.associate = function (models) {
    // associations can be defined here
    CartItem.belongsTo(models.Cart, {
      foreignKey: "cartId",
    });
    CartItem.belongsTo(models.SizeOptions, {
      foreignKey: "sizeOptionId",
    });
    CartItem.belongsTo(models.IceOptions, {
      foreignKey: "iceOptionId",
    });
    CartItem.belongsTo(models.SugarOptions, {
      foreignKey: "sugarOptionId",
    });
  };
  return CartItem;
};
