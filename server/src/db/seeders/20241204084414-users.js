"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          userName: "Иван",
          userLastName: "Иванов",
          email: "ivanov1@mail.ru",
          password: 123,
          registration: "Федеральный округ",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: "Сергей",
          userLastName: "Сергеев",
          email: "ivanov1@mail.ru",
          password: 123,
          registration: "Федеральный округ",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
