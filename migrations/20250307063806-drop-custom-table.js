"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Ice");
    await queryInterface.dropTable("Sugar");
    await queryInterface.dropTable("Size");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Ice");
    await queryInterface.createTable("Sugar");
    await queryInterface.createTable("Size");
  },
};
