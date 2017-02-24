'use strict';
module.exports = function(sequelize, DataTypes) {
  var LegsWatched = sequelize.define('LegsWatched', {
    bioguide_id: DataTypes.STRING(25),
    belongs_to: DataTypes.BIGINT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return LegsWatched;
};