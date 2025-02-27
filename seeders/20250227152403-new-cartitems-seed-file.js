"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("CartItems", [
      {
        cart_id: 7,
        product_id: 45,
        quantity: 5,
        size: 1,
        ice: 0,
        sugar: 0,
        price: 300,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        cart_id: 7,
        product_id: 45,
        quantity: 2,
        size: 1,
        ice: 2,
        sugar: 0,
        price: 120,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        cart_id: 7,
        product_id: 74,
        quantity: 3,
        size: null,
        ice: null,
        sugar: null,
        price: 270,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        cart_id: 7,
        product_id: 77,
        quantity: 2,
        size: null,
        ice: null,
        sugar: null,
        price: 180,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        cart_id: 7,
        product_id: 46,
        quantity: 2,
        size: 0,
        ice: 1,
        sugar: 0,
        price: 120,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        cart_id: 7,
        product_id: 58,
        quantity: 1,
        size: 0,
        ice: 1,
        sugar: 0,
        price: 40,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        cart_id: 7,
        product_id: 59,
        quantity: 3,
        size: 0,
        ice: 2,
        sugar: 1,
        price: 150,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        cart_id: 7,
        product_id: 66,
        quantity: 1,
        size: 2,
        ice: 1,
        sugar: 2,
        price: 150,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        cart_id: 8,
        product_id: 59,
        quantity: 2,
        size: 1,
        ice: 1,
        sugar: 0,
        price: 100,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        cart_id: 8,
        product_id: 60,
        quantity: 1,
        size: 1,
        ice: 1,
        sugar: 0,
        price: 60,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        cart_id: 8,
        product_id: 54,
        quantity: 1,
        size: 1,
        ice: 1,
        sugar: 0,
        price: 40,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        cart_id: 8,
        product_id: 55,
        quantity: 3,
        size: 1,
        ice: 1,
        sugar: 0,
        price: 120,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        cart_id: 9,
        product_id: 69,
        quantity: 2,
        size: null,
        ice: null,
        sugar: null,
        price: 200,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        cart_id: 9,
        product_id: 71,
        quantity: 1,
        size: null,
        ice: null,
        sugar: null,
        price: 100,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        cart_id: 9,
        product_id: 73,
        quantity: 1,
        size: null,
        ice: null,
        sugar: null,
        price: 120,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        cart_id: 9,
        product_id: 75,
        quantity: 1,
        size: null,
        ice: null,
        sugar: null,
        price: 90,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        cart_id: 9,
        product_id: 58,
        quantity: 3,
        size: 1,
        ice: 2,
        sugar: 0,
        price: 150,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        cart_id: 9,
        product_id: 55,
        quantity: 2,
        size: 1,
        ice: 2,
        sugar: 0,
        price: 100,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        cart_id: 9,
        product_id: 65,
        quantity: 1,
        size: 0,
        ice: 0,
        sugar: 0,
        price: 60,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("CartItems", {});
  },
};
