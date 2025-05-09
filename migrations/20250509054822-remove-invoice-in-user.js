"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "invoice");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "invoice", {
      type: Sequelize.STRING,
    });
  },
};
