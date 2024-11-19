"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("SizeOptions", [
      {
        product_id: 1,
        options: JSON.stringify([
          { code: "S", title: { en: "Tall", zh: "小杯" }, price: 0 },
          { code: "M", title: { en: "Grande", zh: "中杯" }, price: 10 },
          { code: "L", title: { en: "Venti", zh: "大杯" }, price: 15 },
        ]),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("SizeOptions", {});
  },
};
