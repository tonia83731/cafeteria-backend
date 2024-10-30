"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Sizes", [
      {
        name: "中杯",
        name_en: "Tall",
        price: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "大杯",
        name_en: "Grande",
        price: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "超大杯",
        name_en: "Venti",
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
