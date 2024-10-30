"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Comments", [
      {
        name: "Sophia",
        rate: 4.5,
        comment:
          "The matcha latte was perfectly balanced, and the cheesecake was delicious!",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Liam",
        email: "liam@example.com",
        rate: 4.0,
        comment:
          "The iced coffee was refreshing, but the brownie could have been softer.",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Comments", {});
  },
};
