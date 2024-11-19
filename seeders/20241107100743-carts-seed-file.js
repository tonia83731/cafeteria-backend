"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Carts", [
      {
        user_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Carts", {});
  },
};
