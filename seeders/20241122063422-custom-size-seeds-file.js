"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("CustomSizes", [
      {
        product_id: 3,
        size_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 3,
        size_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 3,
        size_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 4,
        size_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 4,
        size_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 4,
        size_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 5,
        size_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 5,
        size_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 5,
        size_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("CustomSizes", {});
  },
};
