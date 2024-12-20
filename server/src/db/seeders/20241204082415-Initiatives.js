"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Initiatives",
      [
        {
          title: "Развитие сельских дорог",
          content:
            'Программа "Дороги в каждую деревню" для обеспечения круглогодичного доступа к малонаселенным районам.',
          level: "Муниципальный",
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Повышение безопасности на дорогах",
          content:
            "Установка камер видеофиксации для контроля скорости и соблюдения правил дорожного движения.",
          level: "Муниципальный",
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Модернизация образовательной инфраструктуры",
          content:
            "Оснащение школ современным оборудованием, включая интерактивные доски, компьютеры и лабораторное оборудование.",
          level: "Федеральный",
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Модернизация образовательной инфраструктуры",
          content:
            "Оснащение школ современным оборудованием, включая интерактивные доски, компьютеры и лабораторное оборудование.",
          level: "Региональный",
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Initiatives", null, {});
  },
};