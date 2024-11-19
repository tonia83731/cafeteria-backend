"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Products", [
      {
        title: JSON.stringify({
          en: "Green Tea",
          zh: "绿茶",
        }),
        description: JSON.stringify({
          en: "Refreshing green tea with a delicate flavor.",
          zh: "清爽的绿茶，口感清香。",
        }),
        price: 60,
        category_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: JSON.stringify({
          en: "Chocolate Cake",
          zh: "巧克力蛋糕",
        }),
        description: JSON.stringify({
          en: "Rich and moist chocolate cake.",
          zh: "浓郁湿润的巧克力蛋糕。",
        }),
        price: 100,
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
