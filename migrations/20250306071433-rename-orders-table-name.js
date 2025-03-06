"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Orders", "shipping_id", "shipping");
    await queryInterface.renameColumn("Orders", "payment_id", "payment");
    await queryInterface.renameColumn("Orders", "total_price", "total");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Orders", "shipping", "shipping_id");
    await queryInterface.renameColumn("Orders", "payment", "payment_id");
    await queryInterface.renameColumn("Orders", "total", "total_price");
  },
};
