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
        discount_id: null,
        total: 550,
        status: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 10,
        recipient_name: "Test",
        recipient_phone: "0912345678",
        recipient_address:
          "No. 123, Section 4, Ren’ai Road, Da’an District, Taipei City, 106, Taiwan",
        shipping: 1,
        payment: 0,
        discount_id: null,
        total: 170,
        status: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Orders", {});
  },
};
