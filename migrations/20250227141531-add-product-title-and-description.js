"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Products", "title", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Products", "title_en", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Products", "description", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Products", "description_en", {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Products", "title");
    await queryInterface.removeColumn("Products", "title_en");
    await queryInterface.removeColumn("Products", "description");
    await queryInterface.removeColumn("Products", "description_en");
  },
};
