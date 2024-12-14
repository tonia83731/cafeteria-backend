"use strict";
module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define(
    "CartItem",
    {
      id: {
        // Explicitly define the `id` field if not present
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cartId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      sizeId: DataTypes.INTEGER,
      iceId: DataTypes.INTEGER,
      sugarId: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
    },
    {
      modelName: "CartItem",
      tableName: "CartItems",
      underscored: true,
    }
  );
  CartItem.associate = function (models) {
    // A cart item belongs to one cart
    CartItem.belongsTo(models.Cart, {
      foreignKey: "cartId",
    });

    // A cart item belongs to one product
    CartItem.belongsTo(models.Product, {
      foreignKey: "productId",
    });

    CartItem.belongsTo(models.Size, {
      foreignKey: "sizeId",
    });
    CartItem.belongsTo(models.Ice, {
      foreignKey: "iceId",
    });
    CartItem.belongsTo(models.Sugar, {
      foreignKey: "sugarId",
    });
  };
  return CartItem;
};
