"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Initiative extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Initiative.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      level: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Initiative",
    }
  );
  return Initiative;
};
