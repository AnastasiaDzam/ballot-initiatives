'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          userName: 'Иван',
          userLastName: 'Иванов',
          email: 'ivanov1@mail.ru',
          password: 123,
          registration: 'Федеральный округ',
        },
        {
          userName: 'Сергей',
          userLastName: 'Сергеев',
          email: 'ivanov1@mail.ru',
          password: 123,
          registration: 'Федеральный округ',
          
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
