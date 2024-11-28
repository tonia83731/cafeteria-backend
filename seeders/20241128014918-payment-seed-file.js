"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Payments", [
      {
        title: JSON.stringify({
          zh: "取貨付款",
          en: "Pay upon pickup",
        }),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: JSON.stringify({
          zh: "貨到付款",
          en: "Cash on delivery",
        }),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: JSON.stringify({
          zh: "金融卡或信用卡付款",
          en: "Debit or credit card payment",
        }),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Payments", {});
  },
};
