"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Orders", [
      {
        user_id: 10,
        recipient_name: "Test",
        recipient_phone: "0912345678",
        recipient_address:
          "No. 123, Section 4, Ren’ai Road, Da’an District, Taipei City, 106, Taiwan",
        shipping: 0,
        payment: 0,
        discount_id: 32,
        total: 648,
        status: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 10,
        recipient_name: "User3",
        recipient_phone: "0936458741",
        recipient_address:
          "No. 45, Lane 99, Fuxing South Road, Xinyi District, Taipei City, 110, Taiwan",
        shipping: 1,
        payment: 1,
        discount_id: null,
        total: 490,
        status: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Orders", {});
  },
};
