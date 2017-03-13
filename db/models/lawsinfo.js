'use strict';
module.exports = function(sequelize, DataTypes) {
  var LawsInfo = sequelize.define('LawsInfo', {
    lookup_id: DataTypes.STRING(30),
    id: DataTypes.STRING(30),
    title: DataTypes.TEXT,
    sponsor: DataTypes.TEXT,
    sponsor_lookup_id: DataTypes.STRING(30),
    sponsor_party: DataTypes.STRING(5),
    sponsor_state: DataTypes.STRING(5),
    congressdotgov_url: DataTypes.TEXT,
    introduced_date: DataTypes.STRING(30),
    active: DataTypes.STRING(30),
    cosponsors: DataTypes.NUMBER,
    primary_subject: DataTypes.TEXT,
    committees: DataTypes.TEXT,
    summary: DataTypes.TEXT,
    summary_short: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return LawsInfo;
};