"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Users", "email", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
    await queryInterface.changeColumn("Users", "account", {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Users", "email", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
    });
    await queryInterface.changeColumn("Users", "account", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
    });
  },
};
