"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Users", "phone", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn("Users", "email", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Users", "phone", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn("Users", "email", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
