"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("OrderItems", [
      {
        order_id: 6,
        product_id: 45,
        quantity: 5,
        size: 0,
        ice: 0,
        sugar: 0,
        price: 250,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        order_id: 6,
        product_id: 46,
        quantity: 5,
        size: 0,
        ice: 0,
        sugar: 0,
        price: 300,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        order_id: 7,
        product_id: 52,
        quantity: 1,
        size: 1,
        ice: 0,
        sugar: 0,
        price: 80,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        order_id: 7,
        product_id: 75,
        quantity: 1,
        size: null,
        ice: null,
        sugar: null,
        price: 90,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("OrderItems", {});
  },
};
