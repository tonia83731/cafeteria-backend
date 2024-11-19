"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("SizeOptions", "size_options", "options");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("SizeOptions", "options", "size_options");
  },
};
