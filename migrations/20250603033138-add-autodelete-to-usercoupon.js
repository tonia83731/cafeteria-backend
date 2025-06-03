'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("UserCoupons", "userId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id'
      }
    })
    await queryInterface.changeColumn("UserCoupons", "couponId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Coupons',
        key: 'id'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("UserCoupons", "userId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: null,
      onDelete: null,
    })
    await queryInterface.changeColumn("UserCoupons", "couponId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: null,
      onDelete: null,
    })
  }
};
