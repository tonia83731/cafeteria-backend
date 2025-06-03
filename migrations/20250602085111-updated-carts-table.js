'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Carts", "product_id", {
      type: Sequelize.INTEGER,
      allowNull: false
    })
    await queryInterface.addColumn("Carts", "quantity", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    })
    await queryInterface.addColumn("Carts", "size_id", {
      type: Sequelize.INTEGER,
      defaultValue: null
    })
    await queryInterface.addColumn("Carts", "ice", {
      type: Sequelize.INTEGER,
      defaultValue: null
    })
    await queryInterface.addColumn("Carts", "sugar", {
      type: Sequelize.INTEGER,
      defaultValue: null
    })
    await queryInterface.addColumn("Carts", "item_total", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    })
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
