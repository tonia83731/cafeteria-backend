'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.removeColumn("Orders", "discount_id");
    // await queryInterface.removeColumn("Orders", "tax");
    // await queryInterface.removeColumn("Orders", "product_price");
    // await queryInterface.removeColumn("Orders", "discount_price");
    await queryInterface.renameColumn("Orders", "total", "total_price");
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.addColumn("Orders", "discount_id", {
    //   type: Sequelize.INTEGER
    // });
    // await queryInterface.addColumn("Orders", "tax", {
    //   type: Sequelize.INTEGER
    // });
    // await queryInterface.addColumn("Orders", "product_price", {
    //   type: Sequelize.INTEGER
    // });
    // await queryInterface.addColumn("Orders", "discount_price", {
    //   type: Sequelize.INTEGER
    // });
    await queryInterface.renameColumn("Orders", "total_price", "total");
  }
};
