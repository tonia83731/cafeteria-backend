"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("CartItems", "size", "size_id");
    await queryInterface.renameColumn("CartItems", "ice", "ice_id");
    await queryInterface.renameColumn("CartItems", "sugar", "sugar_id");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("CartItems", "size_id", "size");
    await queryInterface.renameColumn("CartItems", "ice_id", "ice");
    await queryInterface.renameColumn("CartItems", "sugar_id", "sugar");
  },
};
