"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Coupons");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Coupons");
  },
};
