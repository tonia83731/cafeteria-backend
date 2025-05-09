"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Carts");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Carts");
  },
};
