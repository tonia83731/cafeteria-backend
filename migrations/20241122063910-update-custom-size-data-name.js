"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("CustomSizes", "productId", "product_id");
    await queryInterface.renameColumn("CustomSizes", "sizeId", "size_id");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("CustomSizes", "product_id", "productId");
    await queryInterface.renameColumn("CustomSizes", "size_id", "sizeId");
  },
};
