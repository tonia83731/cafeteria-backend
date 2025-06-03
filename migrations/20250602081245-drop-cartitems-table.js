'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("CartItems");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("CartItems");
  }
};
