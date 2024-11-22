"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Users", "language_id", "language");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("TableName", "language", "language_id");
  },
};
