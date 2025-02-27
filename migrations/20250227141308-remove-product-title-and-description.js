"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Products", "title");
    await queryInterface.removeColumn("Products", "description");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Products", "title", {
      type: Sequelize.JSON,
    });
    await queryInterface.addColumn("Products", "description", {
      type: Sequelize.JSON,
    });
  },
};
