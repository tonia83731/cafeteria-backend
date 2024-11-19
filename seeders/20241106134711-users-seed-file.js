"use strict";
const bcrypt = require("bcryptjs");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [
      {
        name: "Liam Bennett",
        email: "liam.bennett@example.com",
        password: await bcrypt.hash("Li@4mB8!gH", 10),
        is_admin: false,
        language_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Emma Collins",
        email: "emma.collins@example.com",
        password: await bcrypt.hash("EmC@8937&J", 10),
        is_admin: false,
        language_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", {});
  },
};
