require("dotenv").config();
const express = require("express"); //* Импорт библиотеки
// const { User } = require("./db/models"); //* Импорт модели
const { Initiative } = require("./db/models"); //* Импорт модели
const serverConfig = require("./config/serverConfig");
const indexRouter = require("./routes/index.route"); // основной роутинг с маршрутами

const app = express(); //* Заводим экземпляр приложения

serverConfig(app); // Прогоняем экземпляр приложения через функцию обучения (app обучен)

const PORT = process.env.PORT || 3000; //* указываем порт, который будет слушать сервер

app.use("/api", indexRouter); // подключаем весь пакет маршрутов на /api //миддлварка(промежуточное ПО) //роуты которые отвечают за работу с api с получением данных из базы

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
}); ////* Старт сервера - прослушивание определенного порта
