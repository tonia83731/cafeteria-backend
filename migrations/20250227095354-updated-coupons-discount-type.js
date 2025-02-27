"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Coupons", "discount_type");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Coupons", "discount_type", {
      type: Sequelize.STRING,
    });
  },
};
