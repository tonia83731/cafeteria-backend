"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Ice", [
      {
        title: JSON.stringify({
          en: "Regular Ice",
          zh: "正常冰",
        }),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: JSON.stringify({
          en: "Less Ice",
          zh: "少冰",
        }),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: JSON.stringify({
          en: "Little Ice",
          zh: "微冰",
        }),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: JSON.stringify({
          en: "Ice Free",
          zh: "去冰",
        }),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Ice", {});
  },
};
