'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          userName: 'Иван',
          userLastName: 'Иванов',
          email: 'ivanov1@mail.ru',
          password: 123,
          registration: 'Федеральный округ',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: 'Сергей',
          userLastName: 'Сергеев',
          email: 'sergeev2@mail.ru',
          password: 123,
          registration: 'Федеральный округ',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
