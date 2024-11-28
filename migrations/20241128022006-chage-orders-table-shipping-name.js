"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Orders", "shipping", "shipping_id");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Orders", "shipping_id", "shipping");
  },
};
