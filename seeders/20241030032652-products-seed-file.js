"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Products", [
      {
        title: "美式黑咖啡",
        title_en: "Americano",
        description: "以熱水沖泡出濃郁順口的咖啡。",
        description_en:
          "A rich coffee brewed with hot water for a smooth taste.",
        price: 105,
        category_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "巧克力慕斯",
        title_en: "Chocolate Mousse",
        description: "輕盈綿密的巧克力甜點，濃郁又奢華。",
        description_en:
          "A light and airy chocolate dessert, rich and decadent.",
        price: 165,
        category_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Products", {});
  },
};
