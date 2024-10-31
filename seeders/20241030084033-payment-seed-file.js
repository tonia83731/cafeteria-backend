"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Payments", [
      {
        method: "貨到付款",
        method_en: "Cash on Delivery",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        method: "信用卡或金融卡",
        method_en: "Debit or Credit Card",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Payments", {});
  },
};
