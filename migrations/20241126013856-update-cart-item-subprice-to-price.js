"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("CartItems", "sub_price", "total");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("CartItems", "total", "sub_price");
  },
};
