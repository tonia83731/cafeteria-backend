"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Orders");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      recipient_name: {
        type: Sequelize.STRING,
      },
      recipient_phone: {
        type: Sequelize.STRING,
      },
      recipient_address: {
        type: Sequelize.STRING,
      },
      shipping: {
        type: Sequelize.JSON,
      },
      payment: {
        type: Sequelize.JSON,
      },
      discount_id: {
        type: Sequelize.INTEGER,
      },
      total_price: {
        type: Sequelize.INTEGER,
      },
      status: {
        defaultValue: "Pending",
        type: Sequelize.STRING,
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
