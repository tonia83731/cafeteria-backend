"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [
      {
        name: "Test",
        email: "test@example.com",
        password: await bcrypt.hash("$Test1234", 10),
        is_admin: false,
        phone: "0912345678",
        account: "@test",
        language: "en",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "User1",
        email: "user1@example.com",
        password: await bcrypt.hash("User1#123", 10),
        is_admin: false,
        phone: "0912345678",
        account: "@user1#123",
        language: "en",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "User2",
        email: "user2@example.com",
        password: await bcrypt.hash("User2#123", 10),
        is_admin: false,
        phone: "0912345678",
        account: "@user2#123",
        language: "zh",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Alice Smith",
        email: "alice.smith@example.com",
        password: await bcrypt.hash("Alice@2024", 10),
        is_admin: false,
        phone: "0933567890",
        account: "@alice_smith",
        language: "zh",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Bob Johnson",
        email: "bob.johnson@example.com",
        password: await bcrypt.hash("Bob#Secure1", 10),
        is_admin: false,
        phone: "0921234567",
        account: "@bob_john",
        language: "en",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Catherine Lee",
        email: "catherine.lee@example.com",
        password: await bcrypt.hash("Cathy#Secure2", 10),
        is_admin: false,
        phone: "0945678901",
        account: "@cathy_lee",
        language: "zh",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Daniel Brown",
        email: "daniel.brown@example.com",
        password: await bcrypt.hash("Dan#Secure3!", 10),
        is_admin: false,
        phone: "0956789012",
        account: "@daneil_brown",
        language: "en",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", {});
  },
};
