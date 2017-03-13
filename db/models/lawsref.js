'use strict';
module.exports = function(sequelize, DataTypes) {
  var LawsRef = sequelize.define('LawsRef', {
    lookup_id: DataTypes.STRING(30),
    latest_major_action: DataTypes.TEXT,
    will_update: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return LawsRef;
};