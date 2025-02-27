"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.renameColumn("Orders", "shipping_id", "shipping");
    // await queryInterface.renameColumn("Orders", "payment_id", "payment");
    // await queryInterface.renameColumn("Orders", "total_price", "total");
    await queryInterface.changeColumn("Orders", "status", {
      defaultValue: 0,
      type: Sequelize.INTEGER,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.renameColumn("Orders", "shipping", "shipping_id");
    // await queryInterface.renameColumn("Orders", "payment", "payment_id");
    // await queryInterface.renameColumn("Orders", "total", "total_price");
    await queryInterface.changeColumn("Orders", "status", {
      defaultValue: "Pending",
      type: Sequelize.STRING,
    });
  },
};
