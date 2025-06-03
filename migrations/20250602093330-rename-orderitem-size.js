'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("OrderItems", "size", "size_id");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("OrderItems", "size_id", "size");
  }
};
