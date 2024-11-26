"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("CartItems", "sugar_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn("CartItems", "ice_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("CartItems", "sugar_id", {
      type: Sequelize.JSON,
      allowNull: true,
    });
    await queryInterface.changeColumn("CartItems", "ice_id", {
      type: Sequelize.JSON,
      allowNull: true,
    });
  },
};
