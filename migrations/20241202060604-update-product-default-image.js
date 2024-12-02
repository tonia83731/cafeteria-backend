"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Products", "image", {
      defaultValue: "https://i.imgur.com/dVRWKfE.jpg",
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Products", "image", {
      defaultValue: "https://imgur.com/dVRWKfE",
      type: Sequelize.STRING,
    });
  },
};
