"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Coupons", "end_date");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Coupons", "end_date", {
      type: Sequelize.DATE,
    });
  },
};
