"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Products", {
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
      price: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      category_id: {
        allowNull: false,
        defaultValue: 1,
        type: Sequelize.INTEGER,
      },
      image: {
        defaultValue: "https://imgur.com/dVRWKfE",
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Products");
  },
};
