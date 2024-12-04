const router = require('express').Router();
const UserController = require('../controllers/User.controller');
const verifyRefreshToken = require('../middleware/verifyRefreshToken');

router
  //* Метод GET - получение новой пары токенов на основе данных из res.locals
  .get('/refreshTokens', verifyRefreshToken, UserController.refreshTokens)

  //* Метод POST - регистрация
  .post('/signUp', UserController.signUp)

  //* Метод POST - аутентификация
  .post('/signIn', UserController.signIn)

  //* Метод GET - выход
  .get('/signOut', UserController.signOut);

module.exports = router;
