"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("DrinkIceOptions", [
      {
        product_id: 1,
        options: JSON.stringify([
          { code: "100%-ice", title: { en: "Regular Ice", zh: "正常冰" } },
          { code: "75%-ice", title: { en: "Less Ice", zh: "少冰" } },
          { code: "50%-ice", title: { en: "Little Ice", zh: "微冰" } },
          { code: "25%-ice", title: { en: "Ice Free", zh: "去冰" } },
          { code: "0%-ice", title: { en: "Hot", zh: "熱" } },
        ]),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("DrinkIceOptions", {});
  },
};
