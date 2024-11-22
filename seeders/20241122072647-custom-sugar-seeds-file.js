"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("CustomSugars", [
      {
        product_id: 3,
        sugar_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 3,
        sugar_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 3,
        sugar_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 3,
        sugar_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 3,
        sugar_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 4,
        sugar_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 4,
        sugar_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 4,
        sugar_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 4,
        sugar_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 4,
        sugar_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 5,
        sugar_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 5,
        sugar_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 5,
        sugar_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 5,
        sugar_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 5,
        sugar_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("CustomSugars", {});
  },
};
