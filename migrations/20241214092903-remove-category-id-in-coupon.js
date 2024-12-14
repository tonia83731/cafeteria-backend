"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Coupons", "category_id");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Coupons", "category_id", {
      type: Sequelize.INTEGER,
    });
  },
};
