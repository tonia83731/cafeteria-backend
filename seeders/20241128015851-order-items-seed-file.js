"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("OrderItems", [
      {
        order_id: 1,
        product_id: 5,
        quantity: 2,
        size_id: 1,
        ice_id: 2,
        sugar_id: 2,
        price: 100,
        created_at: new Date(),
        updated_at: new Date(),
      },
      // -----------------------------------
      {
        order_id: 2,
        product_id: 6,
        quantity: 1,
        size_id: null,
        ice_id: null,
        sugar_id: null,
        price: 65,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        order_id: 2,
        product_id: 7,
        quantity: 2,
        size_id: null,
        ice_id: null,
        sugar_id: null,
        price: 130,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        order_id: 2,
        product_id: 3,
        quantity: 2,
        size_id: 2,
        ice_id: 3,
        sugar_id: 3,
        price: 100,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        order_id: 2,
        product_id: 4,
        quantity: 3,
        size_id: 3,
        ice_id: 1,
        sugar_id: 1,
        price: 165,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("OrderItems", {});
  },
};
