const router = require("express").Router(); // метод который позволяет создать маршрут
const initiativeController = require("../controllers/initiative.controller");

router //! все эти ручки подключены на '/user' из index.routes.js
  //* Метод GET - получить всех user (запустит функцию контроллер для получения всех user)
  .get("/", initiativeController.getAllInitiative) // конечные точки (get, post, put, delete)

  //* Метод GET - получить user по ID (запустит функцию контроллер для получения user по id)
  .get("/:id", initiativeController.getInitiativeById) // id - ключ из req.params

  //* Метод POST - создать user (запустит функцию контроллер для создания нового user)
  .post("/", initiativeController.createInitiative)

  //* Метод PUT - обновить user (запустит функцию контроллер для обновления user по id)
  .put("/:id", initiativeController.updateInitiative)

  //* Метод DELETE - удалить user (запустит функцию контроллер для удаления user по id)
  .delete("/:id", initiativeController.deleteInitiative);

module.exports = router;
