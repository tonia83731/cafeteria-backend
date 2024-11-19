"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Languages", [
      {
        code: "zh",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        code: "en",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Languages", {});
  },
};
