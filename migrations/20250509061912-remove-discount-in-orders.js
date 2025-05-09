"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Orders", "discount_id");
    await queryInterface.removeColumn("Orders", "discount_price");
    await queryInterface.removeColumn("Orders", "total");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Orders", "discount_id", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn("Orders", "discount_price", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn("Orders", "total", {
      type: Sequelize.INTEGER,
    });
  },
};
