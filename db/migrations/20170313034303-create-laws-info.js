'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('LawsInfos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lookup_id: {
        type: Sequelize.STRING(30)
      },
      id: {
        type: Sequelize.STRING(30)
      },
      title: {
        type: Sequelize.TEXT
      },
      sponsor: {
        type: Sequelize.TEXT
      },
      sponsor_lookup_id: {
        type: Sequelize.STRING(30)
      },
      sponsor_party: {
        type: Sequelize.STRING(5)
      },
      sponsor_state: {
        type: Sequelize.STRING(5)
      },
      congressdotgov_url: {
        type: Sequelize.TEXT
      },
      introduced_date: {
        type: Sequelize.STRING(30)
      },
      active: {
        type: Sequelize.STRING(30)
      },
      cosponsors: {
        type: Sequelize.INTEGER
      },
      primary_subject: {
        type: Sequelize.TEXT
      },
      committees: {
        type: Sequelize.TEXT
      },
      summary: {
        type: Sequelize.TEXT
      },
      summary_short: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('LawsInfos');
  }
};