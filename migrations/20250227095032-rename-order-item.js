"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("OrderItems", "size_id", "size");
    await queryInterface.renameColumn("OrderItems", "ice_id", "ice");
    await queryInterface.renameColumn("OrderItems", "sugar_id", "sugar");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("OrderItems", "size", "size_id");
    await queryInterface.renameColumn("OrderItems", "ice", "ice_id");
    await queryInterface.renameColumn("OrderItems", "sugar", "sugar_id");
  },
};
