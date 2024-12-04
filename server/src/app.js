const express = require('express');
require('dotenv').config();
const serverConfig = require('./config/serverConfig'); //импорт из конфиг;
const indexRoutes = require('./routes/index.route');

const PORT = process.env.PORT || 3001; //назначаем порт;

const app = express(); //экземпляр express;

app.get('/', (req, res) => {
    res.send(`<div style='margin-top: 30px'>Работает!</div>`)
})

serverConfig(app);  //ЗДЕСЬ app проходит через ЭТАП КОНФИГИ;

app.use('/api', indexRoutes);

app.listen(PORT, () => {    //слушаем порт 3000;
    console.log(`Server started, on ${PORT}!`); //консолим что работает при запуске сервера;
});