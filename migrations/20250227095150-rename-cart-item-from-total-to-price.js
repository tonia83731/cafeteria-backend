"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("CartItems", "total", "price");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("CartItems", "price", "total");
  },
};
