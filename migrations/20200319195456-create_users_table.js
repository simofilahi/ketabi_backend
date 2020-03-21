'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users',
      {
        user_id: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        user_name: {
          type: Sequelize.STRING(32),
          allowNull: false,
          unique: true,
        },
        user_mail: {
          type: Sequelize.STRING(128),
          allowNull: false,
        },
        user_pass: {
          type: Sequelize.STRING(128),
          allowNull: false,
        },
        user_status: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
