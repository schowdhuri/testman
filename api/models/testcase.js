'use strict';
module.exports = (sequelize, DataTypes) => {
  var TestCase = sequelize.define('TestCase', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return TestCase;
};