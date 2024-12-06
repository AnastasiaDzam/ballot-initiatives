
require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors'); //* библиотека позволяющая добавлять заголовки для cors-политики
const morgan = require('morgan'); //* библиотека позволяющая выводить запросы в лог
const cookieParser = require('cookie-parser'); //* библиотека позволяющая парсить куки
const removeHTTPHeader = require('../middleware/removeHeader'); //* наша кастомная мидлварка

//NOTE: функция serverConfig, принимающая экземпляр приложения и возвращающая обученный экземпляр

//* достаем путь до клиента из env
const { CLIENT_URL } = process.env;

//* конфигурация для библиотеки cors
const corsConfig = {
  origin: [CLIENT_URL,],
  credentials: true,
};

//NOTE промежуточные обработчики, работающие глобально для всего приложения (системные мидлварки)
const serverConfig = (app) => {
  //* позволяет работать с телом запроса
  app.use(express.urlencoded({ extended: true }));

  //* парсит JSON
  app.use(express.json());

  //* логирует данные о запросах на сервер
  app.use(morgan('dev'));

  //* парсит куки
  app.use(cookieParser());

  //* встраивает заголовки для cors-политики
  app.use(cors(corsConfig));

  //* кастомная мидлварка для удаления HTTP заголовка
  app.use(removeHTTPHeader);

  //* настройка статики, папка public ассоциирована с маршрутом запроса
  app.use(
    '/static/images',
    express.static(path.resolve(__dirname, '..', 'public', 'images'))
  );
};


module.exports = serverConfig;
