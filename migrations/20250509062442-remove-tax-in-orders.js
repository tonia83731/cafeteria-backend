"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Orders", "tax");
    await queryInterface.renameColumn("Orders", "product_price", "total");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Orders", "tax", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.renameColumn("Orders", "total", "product_price");
  },
};
