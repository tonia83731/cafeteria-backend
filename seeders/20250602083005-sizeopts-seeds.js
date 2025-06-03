'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('SizeOpts', [
    {
      code: 'S',
      price_addon: 0,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      code: 'M',
      price_addon: 10,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      code: 'L',
      price_addon: 15,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("SizeOpts", {});
  }
};
