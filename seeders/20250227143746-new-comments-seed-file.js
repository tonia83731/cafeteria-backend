"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Comments", [
      {
        name: "Damin Wang",
        email: "wang.daming@example.com",
        rate: 5,
        comment: "服務非常好，產品品質優良！",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "陳美玲",
        email: "chen.meiling@example.com",
        rate: 4,
        comment: "Overall good, but there's room for improvement.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "John Doe",
        email: "john.doe@example.com",
        rate: 3,
        comment: "普通體驗，沒有特別驚喜。",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "佐藤健",
        email: "sato.takeru@example.com",
        rate: 5,
        comment: "Amazing shopping experience! Highly recommended!",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Emily Smith",
        email: "emily.smith@example.com",
        rate: 2,
        comment: "產品沒有達到預期，希望改進。",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Comments", {});
  },
};
