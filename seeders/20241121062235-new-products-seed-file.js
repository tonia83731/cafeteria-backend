"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Products", [
      {
        title: JSON.stringify({
          zh: "茉莉綠茶",
          en: "Jasmine Green Tea",
        }),
        description: JSON.stringify({
          zh: "清新的茉莉花香與綠茶融合",
          en: "Refreshing jasmine fragrance blended with green tea",
        }),
        price: 40,
        category_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: JSON.stringify({
          zh: "伯爵紅茶",
          en: "Earl Grey Tea",
        }),
        description: JSON.stringify({
          zh: "帶有佛手柑香氣的經典紅茶",
          en: "Classic black tea with a hint of bergamot",
        }),
        price: 40,
        category_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: JSON.stringify({
          zh: "厚焙烏龍",
          en: "Heavy Roasted Oolong",
        }),
        description: JSON.stringify({
          zh: "濃郁的烏龍茶風味，帶有煙燻香氣",
          en: "Rich oolong tea flavor with a smoky aroma",
        }),
        price: 50,
        category_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: JSON.stringify({
          zh: "紅蘿蔔蛋糕",
          en: "Carrot Cake",
        }),
        description: JSON.stringify({
          zh: "濕潤的紅蘿蔔蛋糕，配上奶油乳酪霜",
          en: "Moist carrot cake with cream cheese frosting",
        }),
        price: 65,
        category_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: JSON.stringify({
          zh: "芝士蛋糕",
          en: "Cheesecake",
        }),
        description: JSON.stringify({
          zh: "濃郁香滑的芝士蛋糕",
          en: "Rich and creamy cheesecake",
        }),
        price: 65,
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
