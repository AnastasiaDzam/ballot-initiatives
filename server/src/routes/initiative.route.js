const router = require("express").Router(); // метод который позволяет создать маршрут
const InitiativeController = require("../controllers/initiative.controller");

router //! все эти ручки подключены на '/user' из index.routes.js
  //* Метод GET - получить всех user (запустит функцию контроллер для получения всех user)
  .get("/", InitiativeController.getAllInitiative) // конечные точки (get, post, put, delete)

  //* Метод GET - получить user по ID (запустит функцию контроллер для получения user по id)
  .get("/:id", InitiativeController.getInitiativekById) // id - ключ из req.params

  //* Метод POST - создать user (запустит функцию контроллер для создания нового user)
  .post("/", InitiativeController.createInitiative)

  //* Метод PUT - обновить user (запустит функцию контроллер для обновления user по id)
  .put("/:id", InitiativeController.updateInitiative)

  //* Метод DELETE - удалить user (запустит функцию контроллер для удаления user по id)
  .delete("/:id", InitiativeController.deleteInitiative);

module.exports = router;
