"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Products", "title", {
      type: Sequelize.STRING(255),
      allowNull: false,
    });
    await queryInterface.changeColumn("Products", "title_en", {
      type: Sequelize.STRING(255),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Products", "title", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn("Products", "title_en", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
