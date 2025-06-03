'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "invoice");
    await queryInterface.changeColumn("Users", "email", {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    })
    await queryInterface.changeColumn("Users", "account", {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "invoice", {
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn("Users", "email", {
      type: Sequelize.STRING,
      allowNull: false
    })
    await queryInterface.changeColumn("Users", "account", {
      type: Sequelize.STRING,
    })
  }
};
