"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Cupons", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      title_en: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      description_en: {
        type: Sequelize.TEXT,
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
        allowNull: false,
        defaultValue: "amount", // amount or percentage
        type: Sequelize.STRING,
      },
      discount_value: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      target_category_id: {
        type: Sequelize.INTEGER,
      },
      target_product_id: {
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
    return queryInterface.dropTable("Cupons");
  },
};
