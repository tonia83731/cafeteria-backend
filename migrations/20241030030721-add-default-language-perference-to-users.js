"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Users", "perference_langauge_id", {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Users", "perference_langauge_id", {
      type: Sequelize.INTEGER,
    });
  },
};
