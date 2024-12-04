'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      this.hasMany(models.Initiative, {foreignKey: 'user_id'});
    }
  }
  user.init({
    userName: DataTypes.STRING,
    userLastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING, 
    registration: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};