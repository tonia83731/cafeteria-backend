"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn(
      "Cards",
      "expireation_date",
      "expiration_date"
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn(
      "Cards",
      "expiration_date",
      "expireation_date"
    );
  },
};
