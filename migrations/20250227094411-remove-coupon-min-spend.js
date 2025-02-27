"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Coupons", "min_spend");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Coupons", "min_spend", {
      type: Sequelize.INTEGER,
    });
  },
};
