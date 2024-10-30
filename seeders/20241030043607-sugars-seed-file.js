"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Sugars", [
      {
        name: "無糖",
        name_en: "No Sugar",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "1分糖",
        name_en: "10% Sugar",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "3分糖",
        name_en: "30% Sugar",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "半糖",
        name_en: "Half Sugar",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "7分糖",
        name_en: "70% Sugar",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "全糖",
        name_en: "Full Sugar",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Sugars", {});
  },
};
