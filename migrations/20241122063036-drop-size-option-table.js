"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("SizeOptions");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("SizeOptions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      product_id: {
        type: Sequelize.INTEGER,
      },
      size_options: {
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
