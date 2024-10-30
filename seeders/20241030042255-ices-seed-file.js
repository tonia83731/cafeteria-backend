"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Ice", [
      {
        name: "熱",
        name_en: "Hot",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "去冰",
        name_en: "No Ice",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "微冰",
        name_en: "Less Ice",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "少冰",
        name_en: "Little Ice",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "正常",
        name_en: "Regular Ice",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("DefaultIces", {});
  },
};
