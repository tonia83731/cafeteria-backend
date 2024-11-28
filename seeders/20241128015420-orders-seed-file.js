"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Orders", [
      {
        user_id: 6,
        recipient_name: "Test",
        recipient_phone: "0935678901",
        recipient_address: "台北市大安區忠孝東路四段123號7樓",
        shipping_id: 2,
        payment_id: 2,
        total_price: 140,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 6,
        recipient_name: "Test",
        recipient_phone: "0935678901",
        recipient_address: "台北市大安區忠孝東路四段123號7樓",
        shipping_id: 3,
        payment_id: 2,
        total_price: 520,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Orders", {});
  },
};
