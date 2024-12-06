'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Initiative }) {
      this.belongsToMany(Initiative, { through: "Votes", foreignKey: "user_id" });
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