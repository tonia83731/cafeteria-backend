'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("OrderItems", "price", "item_price");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("OrderItems", "item_price", "price");
  }
};
