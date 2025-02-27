"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Carts", [
      {
        user_id: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 11,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 12,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 13,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 14,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 15,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 16,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Carts", {});
  },
};
