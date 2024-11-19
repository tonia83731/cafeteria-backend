"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Coupons", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.JSON,
      },
      description: {
        type: Sequelize.JSON,
      },
      code: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      start_date: {
        defaultValue: new Date(),
        type: Sequelize.DATE,
      },
      end_date: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE,
      },
      discount_type: {
        // percent or price
        allowNull: false,
        type: Sequelize.STRING,
      },
      discount_value: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      category_id: {
        // drinks or desserts or null
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Coupons");
  },
};
