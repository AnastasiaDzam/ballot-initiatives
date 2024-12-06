"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    static associate(models) {
      this.belongsTo(models.Initiative, {
        foreignKey: "initiative_id"
      });
    }
  }
  Vote.init(
    {
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          key: "id",
          model: "Users",
        },
        onDelete: "cascade",
      },
      initiative_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          key: "id",
          model: "Initiatives",
        },
        onDelete: "cascade",
      },
    },
    {
      sequelize,
      modelName: "Vote",
    }
  );
  return Vote;
};