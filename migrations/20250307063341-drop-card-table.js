"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Cards");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Cards");
  },
};
