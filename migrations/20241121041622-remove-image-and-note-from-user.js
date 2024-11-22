"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "note");
    await queryInterface.removeColumn("Users", "image");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "note", {
      type: Sequelize.TEXT,
    });
    await queryInterface.addColumn("Users", "image", {
      defaultValue: "https://imgur.com/lFKKzyL",
      type: Sequelize.STRING,
    });
  },
};
