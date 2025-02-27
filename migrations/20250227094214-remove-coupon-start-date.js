"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Coupons", "start_date");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Coupons", "start_date", {
      type: Sequelize.DATE,
    });
  },
};
