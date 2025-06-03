'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Coupons", "description", {
      type: Sequelize.STRING(300),
      defaultValue: "這是一張優惠券，使用時請遵守相關規定：每人限用一次，不得與其他優惠併用，詳情請洽客服。"
    });
    await queryInterface.addColumn("Coupons", "description_en", {
      type: Sequelize.STRING(300),
      defaultValue: "This is a coupon. Please follow the usage rules: one-time use per person, not combinable with other offers. For details, please contact customer service."
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Coupons", "description", {
      type: Sequelize.STRING
    });
    await queryInterface.removeColumn("Coupons", "description_en");
  }
};
