"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Coupons", [
      {
        title: "春季特惠",
        title_en: "Spring Sale",
        description: "春季特惠，全館商品折扣",
        description_en: "Spring discount on all products",
        discount_type: 0,
        discount_value: 10,
        code: "SPRING10",
        end_date: 1712342399,
        is_published: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "四月限定",
        title_en: "April Special",
        description: "四月限定，指定商品享優惠",
        description_en: "April special discount on selected items",
        discount_type: 1,
        discount_value: 50,
        code: "APRIL50",
        end_date: 1712702399,
        is_published: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "復活節優惠",
        title_en: "Easter Deal",
        description: "復活節快樂，結帳時折扣",
        description_en: "Happy Easter! Discount at checkout",
        discount_type: 0,
        discount_value: 15,
        code: "EASTER15",
        end_date: 1713220799,
        is_published: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "週末促銷",
        title_en: "Weekend Promo",
        description: "週末特惠，限時折扣",
        description_en: "Weekend special, limited-time discount",
        discount_type: 1,
        discount_value: 30,
        code: "WEEKEND30",
        end_date: 1713743999,
        is_published: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "五一勞動節特賣",
        title_en: "May Day Sale",
        description: "五一勞動節特價活動",
        description_en: "Labor Day special sale",
        discount_type: 0,
        discount_value: 20,
        code: "MAYDAY20",
        end_date: 1714588799,
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
