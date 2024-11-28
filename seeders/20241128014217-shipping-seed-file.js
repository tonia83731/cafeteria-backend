"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Shippings", [
      {
        title: JSON.stringify({
          zh: "到店取貨",
          en: "Pickup at the store",
        }),
        price: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: JSON.stringify({
          zh: "標準配送",
          en: "Standard delivery",
        }),
        price: 40,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: JSON.stringify({
          zh: "優先配送",
          en: "Priority delivery",
        }),
        price: 60,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Shippings", {});
  },
};
