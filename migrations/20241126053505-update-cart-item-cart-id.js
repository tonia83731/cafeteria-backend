"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("CartItems", "cart_id", {
      type: Sequelize.INTEGER,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("CartItems", "cart_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
