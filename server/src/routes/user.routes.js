const router = require('express').Router();
const UserController = require('../controllers/User.controller');
const verifyAccessToken = require('../middleware/verifyAccessToken');

router
  //* Метод GET - получить все задачи (запустит функцию контроллер для получения всех задач)
  .get('/', UserController.getAllUsers)

  //* Метод GET - получить задачу по ID (запустит функцию контроллер для получения задачи по id)
  .get('/:id', UserController.getUserById)

  //* Метод POST - создать задачу (запустит функцию контроллер для создания новой задачи)
  .post('/', verifyAccessToken, UserController.createUser)

  //* Метод PUT - обновить задачу (запустит функцию контроллер для обновления задачи по id)
  .put('/:id', verifyAccessToken, UserController.updateUser)

  //* Метод DELETE - удалить задачу (запустит функцию контроллер для удаления задачи по id)
  .delete('/:id', verifyAccessToken, UserController.deleteUser);

module.exports = router;
