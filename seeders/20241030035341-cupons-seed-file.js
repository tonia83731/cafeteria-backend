"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Cupons", [
      {
        title: "秋季特惠",
        title_en: "Autumn Special",
        code: "@SAVE30",
        description: "在這個秋季，所有飲品享受 30% 折扣。",
        description_en: "Get 30% off on all drinks this autumn season.",
        start_date: new Date("2024-10-01"),
        end_date: new Date("2024-11-30"),
        discount_type: "Percentage",
        discount_value: 30,
        target_category_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "甜點樂趣",
        title_en: "Dessert Delight",
        code: "@FREECAKE",
        description: "購買任何甜點，免費贈送迷你芝士蛋糕！",
        description_en: "Buy any dessert and get a mini cheesecake for free!",
        start_date: new Date("2024-10-15"),
        end_date: new Date("2024-12-31"),
        discount_type: "Amount",
        discount_value: 100,
        target_category_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "雙重享受",
        title_en: "Double Delight",
        code: "@DOUBLE20",
        description: "享受飲品和甜點的 20% 折扣。",
        description_en: "Enjoy 20% off on both drinks and desserts.",
        start_date: new Date("2024-11-01"),
        end_date: new Date("2024-12-31"),
        discount_type: "Percentage",
        discount_value: 20,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Cupons", {});
  },
};
