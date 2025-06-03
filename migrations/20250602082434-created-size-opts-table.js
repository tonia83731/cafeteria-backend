'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SizeOpts', {
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      price_addon: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SizeOpts')
  }
};
