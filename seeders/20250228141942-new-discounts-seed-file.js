"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Discounts", [
      {
        user_id: 10,
        coupon_id: 14,
        is_applied: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 11,
        coupon_id: 14,
        is_applied: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 12,
        coupon_id: 14,
        is_applied: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 13,
        coupon_id: 14,
        is_applied: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 14,
        coupon_id: 14,
        is_applied: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 15,
        coupon_id: 14,
        is_applied: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 16,
        coupon_id: 14,
        is_applied: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 17,
        coupon_id: 14,
        is_applied: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Discounts", {});
  },
};
