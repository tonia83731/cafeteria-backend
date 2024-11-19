"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("DrinkSugarOptions", [
      {
        product_id: 1,
        options: JSON.stringify([
          { code: "100%-sugar", title: { en: "Full Sugar", zh: "全糖" } },
          { code: "75%-sugar", title: { en: "75% Sugar", zh: "少糖" } },
          { code: "50%-sugar", title: { en: "Half Sugar", zh: "半糖" } },
          { code: "25%-sugar", title: { en: "25% Sugar", zh: "微糖" } },
          { code: "0%-sugar", title: { en: "Sugar Free", zh: "無糖" } },
        ]),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("DrinkSugarOptions", {});
  },
};
