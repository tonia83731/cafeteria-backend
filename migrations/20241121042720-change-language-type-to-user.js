"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Users", "language", {
      type: Sequelize.STRING,
      defaultValue: "zh",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Users", "language", {
      type: Sequelize.INTEGER,
    });
  },
};
