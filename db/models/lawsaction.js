'use strict';
module.exports = function(sequelize, DataTypes) {
  var LawsAction = sequelize.define('LawsAction', {
    lookup_id: DataTypes.STRING(30),
    bill_id: DataTypes.STRING(30),
    datetime: DataTypes.TEXT,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return LawsAction;
};