"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Wishes", [
      {
        user_id: 10,
        product_id: 56,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 10,
        product_id: 62,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 10,
        product_id: 48,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 10,
        product_id: 51,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 10,
        product_id: 71,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 11,
        product_id: 72,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 11,
        product_id: 64,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 11,
        product_id: 46,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 12,
        product_id: 49,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 12,
        product_id: 55,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 12,
        product_id: 68,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 12,
        product_id: 73,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Wishes", {});
  },
};
