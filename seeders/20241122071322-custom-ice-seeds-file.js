"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("CustomIce", [
      {
        product_id: 3,
        ice_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 3,
        ice_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 3,
        ice_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 3,
        ice_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 4,
        ice_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 4,
        ice_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 4,
        ice_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 4,
        ice_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 5,
        ice_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 5,
        ice_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 5,
        ice_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 5,
        ice_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("CustomIce", {});
  },
};
