"use strict";
const bcrypt = require("bcryptjs");
const { language_code } = require("../helpers/code/language-code");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [
      {
        name: "PriorityAdmin",
        account: "@priority_account",
        email: "priorityadmin@example.com",
        password: await bcrypt.hash("Admin123", 10),
        is_admin: true,
        language: language_code.MANDARIN,
        address: "台北市信義區市府路45號",
        phone: "0234567890",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", {});
  },
};
