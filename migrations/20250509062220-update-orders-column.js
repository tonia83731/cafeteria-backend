"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Orders", "recipient_name", {
      type: Sequelize.STRING(255),
      allowNull: true,
    });
    await queryInterface.changeColumn("Orders", "recipient_phone", {
      type: Sequelize.STRING(255),
      allowNull: true,
    });
    await queryInterface.changeColumn("Orders", "recipient_address", {
      type: Sequelize.STRING(255),
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Orders", "recipient_name", {
      type: Sequelize.STRING(255),
      allowNull: false,
    });
    await queryInterface.changeColumn("Orders", "recipient_phone", {
      type: Sequelize.STRING(255),
      allowNull: false,
    });
    await queryInterface.changeColumn("Orders", "recipient_address", {
      type: Sequelize.STRING(255),
      allowNull: false,
    });
  },
};
