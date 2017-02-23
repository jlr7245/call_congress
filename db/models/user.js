'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING(32),
    password: DataTypes.TEXT,
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    state: DataTypes.STRING(10),
    district: DataTypes.BIGINT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};