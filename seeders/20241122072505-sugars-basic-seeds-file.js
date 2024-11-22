"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Sugars", [
      {
        title: JSON.stringify({
          en: "Full Sugar",
          zh: "全糖",
        }),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: JSON.stringify({
          en: "75% Sugar",
          zh: "少糖",
        }),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: JSON.stringify({
          en: "Half Sugar",
          zh: "半糖",
        }),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: JSON.stringify({
          en: "25% Sugar",
          zh: "微糖",
        }),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: JSON.stringify({
          en: "Sugar Free",
          zh: "無糖",
        }),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Sugars", {});
  },
};
