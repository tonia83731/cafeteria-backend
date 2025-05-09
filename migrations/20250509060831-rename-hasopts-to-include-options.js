"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn(
      "Categories",
      "has_opts",
      "include_option"
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn(
      "Categories",
      "include_option",
      "has_opts"
    );
  },
};
