"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Categories", [
      {
        name: "DRINKS",
        name_en: "飲品",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "DESSERTS",
        name_en: "甜點",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Categories", {});
  },
};
