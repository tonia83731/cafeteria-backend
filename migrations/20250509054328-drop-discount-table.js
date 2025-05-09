"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Discounts");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Discounts");
  },
};
