"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Categories", "hasOpts", "has_opts");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Categories", "has_opts", "hasOpts");
  },
};
