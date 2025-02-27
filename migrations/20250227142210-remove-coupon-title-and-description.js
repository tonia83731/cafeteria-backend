"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Coupons", "title");
    await queryInterface.removeColumn("Coupons", "description");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Coupons", "title", {
      type: Sequelize.JSON,
    });
    await queryInterface.addColumn("Coupons", "description", {
      type: Sequelize.JSON,
    });
  },
};
