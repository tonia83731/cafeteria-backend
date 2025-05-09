"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable("CartItems", "Carts");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable("Carts", "CartItems");
  },
};
