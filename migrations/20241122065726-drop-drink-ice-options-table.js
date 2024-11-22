"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("DrinkIceOptions");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("DrinkIceOptions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      product_id: {
        type: Sequelize.INTEGER,
      },
      options: {
        type: Sequelize.JSON,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
};
