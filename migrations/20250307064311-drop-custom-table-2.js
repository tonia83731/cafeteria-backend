"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Sugars");
    await queryInterface.dropTable("Sizes");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Sugars");
    await queryInterface.createTable("Sizes");
  },
};
