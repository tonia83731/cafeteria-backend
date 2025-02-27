"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Coupons", "title", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Coupons", "title_en", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Coupons", "description", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Coupons", "description_en", {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Coupons", "title");
    await queryInterface.removeColumn("Coupons", "title_en");
    await queryInterface.removeColumn("Coupons", "description");
    await queryInterface.removeColumn("Coupons", "description_en");
  },
};
