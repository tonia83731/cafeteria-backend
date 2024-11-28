"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("OrderItems");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("CustomSugars", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      order_id: {
        type: Sequelize.INTEGER,
      },
      product_id: {
        type: Sequelize.INTEGER,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      size: {
        type: Sequelize.JSON,
      },
      ice: {
        type: Sequelize.JSON,
      },
      sugar: {
        type: Sequelize.JSON,
      },
      sub_price: {
        type: Sequelize.INTEGER,
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
