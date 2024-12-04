//config - промежуточный этап, где запрос на сервер проходит через промежточное ПО(конфиги) и идет дальше;

const express = require('express');  //импорт экспресс;
const morgan = require('morgan');  //импорт морган;
const removeHTTPHeader = require('../middleware/removeHeader');  //импорт самодельной ПО middle-ware;
const path = require('path') //подключаем путь (библиотеку path);

//middle-ware системные из под капота;
const serverConfig = (app) => {   //функция, которая будет ПРИНИМАТЬ APP и ПОДКЛЮЧАТЬ КОНФИГИ к app;
    app.use(express.urlencoded({ extended: true }));  //для раскодировки запроса, позволяет работать с телом запроса;
    app.use(express.json());  //для чтения в формате JSON (парсинг json);
    app.use(morgan('dev'));  //для вывода в консоль инф.о запросах и отв;
    app.use(removeHTTPHeader); // кастомная промежуточное ПО middle-war;
    app.use('/static/images', express.static(path.resolve(__dirname, '..', 'public', 'images'))); //учим сервер отдавать статичные файлы из папки /public;
};


module.exports = serverConfig; //экспорт
