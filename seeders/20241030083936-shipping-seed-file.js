"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Shippings", [
      {
        method: "標準運送",
        method_en: "Standard Shipping",
        price: 40,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        method: "優先運送",
        method_en: "Priority Shipping",
        price: 100,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Shippings", {});
  },
};
