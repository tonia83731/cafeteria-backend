"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Coupons", [
      {
        title: JSON.stringify({
          en: "20% Off on All Drinks",
          zh: "所有飲品20%折扣",
        }),
        description: JSON.stringify({
          en: "Enjoy a 20% discount on all drinks at our store.",
          zh: "在我們店裡享受所有飲品的20%折扣。",
        }),
        code: "DISCOUNT20",
        start_date: new Date("2024-11-01T00:00:00Z"),
        end_date: new Date("2024-11-30T23:59:59Z"),
        discount_type: "percent",
        discount_value: 20,
        category_id: 1,
        is_published: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: JSON.stringify({
          en: "$5 Off Desserts",
          zh: "甜品5美元折扣",
        }),
        description: JSON.stringify({
          en: "Get $5 off any dessert when you make a purchase.",
          zh: "購買任何甜品時立減5美元。",
        }),
        code: "DESSERT5",
        start_date: new Date("2024-11-05T00:00:00Z"),
        end_date: new Date("2024-11-20T23:59:59Z"),
        discount_type: "price",
        discount_value: 150,
        category_id: 2,
        is_published: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: JSON.stringify({
          en: "10% Off Any Item",
          zh: "任何商品10%折扣",
        }),
        description: JSON.stringify({
          en: "Get a 10% discount on your total order, applicable to both drinks and desserts.",
          zh: "在我們店裡享受您的總訂單10%折扣，適用於飲品和甜品。",
        }),
        code: "TOTAL10",
        start_date: new Date("2024-11-01T00:00:00Z"),
        end_date: new Date("2024-11-30T23:59:59Z"),
        discount_type: "percent",
        discount_value: 10,
        category_id: null,
        is_published: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Coupons", {});
  },
};
