"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Coupons", "additional", "min_spend");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Coupons", "min_spend", "additional");
  },
};
