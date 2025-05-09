"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("CartItems", "cart_id");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("CartItems", "cart_id", {
      type: Sequelize.INTEGER,
    });
  },
};
