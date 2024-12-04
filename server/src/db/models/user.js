'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Initiative, {foreignKey: 'user_id'});
    }
  }
  User.init({
    userName: DataTypes.STRING,
    userLastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING, 
    registration: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

