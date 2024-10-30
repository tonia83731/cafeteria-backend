"use strict";
const bcrypt = require("bcryptjs");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [
      {
        name: "Root",
        email: "root@example.com",
        password: await bcrypt.hash("12345678", 10),
        is_admin: true,
        created_at: new Date(),
        updated_at: new Date(),
        perference_langauge_id: 2,
      },
      {
        name: "Liam Bennett",
        email: "liam.bennett@example.com",
        password: await bcrypt.hash("Li@4mB8!gH", 10),
        is_admin: false,
        created_at: new Date(),
        updated_at: new Date(),
        perference_langauge_id: 1,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", {});
  },
};
