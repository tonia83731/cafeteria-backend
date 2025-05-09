"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Carts", "user_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.changeColumn("Carts", "product_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.changeColumn("Carts", "quantity", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.changeColumn("Carts", "price", {
      type: Sequelize.INTEGER,
      allowNull: false,
      default: 0,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Carts", "user_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn("Carts", "product_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn("Carts", "quantity", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn("Carts", "price", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
