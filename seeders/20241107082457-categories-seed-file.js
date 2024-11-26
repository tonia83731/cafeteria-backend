"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Categories", [
      {
        code: "COFFEE",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        code: "TEA",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        code: "FROZEN",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        code: "DESSERT",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Categories", {});
  },
};
