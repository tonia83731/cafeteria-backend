"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("CartItems", [
      {
        cart_id: 3,
        product_id: 3,
        quantity: 2,
        size_id: 2,
        ice_id: 1,
        sugar_id: 1,
        total: 100,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        cart_id: 3,
        product_id: 5,
        quantity: 3,
        size_id: 7,
        ice_id: 10,
        sugar_id: 13,
        total: 150,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        cart_id: 3,
        product_id: 6,
        quantity: 1,
        size_id: null,
        ice_id: null,
        sugar_id: null,
        total: 65,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        cart_id: 3,
        product_id: 9,
        quantity: 2,
        size_id: null,
        ice_id: null,
        sugar_id: null,
        total: 140,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("CartItems", {});
  },
};
