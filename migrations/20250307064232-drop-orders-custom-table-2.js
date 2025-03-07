"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Shippings");
    await queryInterface.dropTable("Payments");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Shippings");
    await queryInterface.createTable("Payments");
  },
};
