"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Sizes", [
      {
        title: JSON.stringify({
          en: "Tall",
          zh: "中杯",
        }),
        price: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: JSON.stringify({
          en: "Grande",
          zh: "大杯",
        }),
        price: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: JSON.stringify({
          en: "Venti",
          zh: "特大杯",
        }),
        price: 15,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Sizes", {});
  },
};
