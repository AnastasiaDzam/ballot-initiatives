const InitiativeService = require("../services/Initiative.service");
const InitiativeValidator = require("../utils/Initiatives.validator");
const isValidId = require("../utils/isValidId");
const formatResponse = require("../utils/formatResponse");
const reformatId = require("../utils/reformatId");

class InitiativeController {
  static async getAllInitiative(req, res) {
    try {
      //? За запросы в БД отвечает сервис
      const initiative = await InitiativeService.getAll();

      //! Проверка на длину списка задач (обработка негативного кейса)
      if (initiative.length === 0) {
        return res
          .status(204)
          .json(formatResponse(204, "No initiative found", []));
      }

      //* Успешный кейс
      res.status(200).json(formatResponse(200, "success", initiative));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async getInitiativeById(req, res) {
    const { id } = req.params; // req.params - объект параметров у адресной строки 

    //! Проверка на валидность ID (обработка негативного кейса)
    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, "Invalid initiative ID"));
    }

    try {
      //? За запросы в БД отвечает сервис (форматируем id под тип данных number)
      const initiative = await InitiativeService.getById(reformatId(id)); // возвращает строку, поэтому сразу преобразовываем ID в число

      //! Проверка на существование такой задачи (обработка негативного кейса)
      if (!initiative) {
        return res
          .status(404)
          .json(formatResponse(404, `Initiative with id ${id} not found`));
      }

      //* Успешный кейс
      res.status(200).json(formatResponse(200, "success", initiative));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async createInitiative(req, res) {
    const { title, content, level, user_id } = req.body;

    //! Проверка наличия необходимых данных - Используем InitiativeValidator (обработка негативного кейса)
    const { isValid, error } = InitiativeValidator.validate({
      title,
      content,
      level,
      user_id,
    });
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Validation error", null, error));
    }

    try {
      //? За запросы в БД отвечает сервис
      const newInitiative = await InitiativeService.create({
        title,
        content,
        level,
        user_id,
      });

      //! Проверка на существование новой задачи (обработка негативного кейса)
      if (!newInitiative) {
        return res
          .status(400)
          .json(formatResponse(400, `Failed to create new initiative`));
      }

      //* Успешный кейс
      res.status(201).json(formatResponse(201, "success", newInitiative));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async updateInitiative(req, res) {
    const { id } = req.params;
    const { title, content, level, user_id } = req.body;

    //! Проверка на валидность ID (обработка негативного кейса)
    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, "Invalid Initiative ID"));
    }

    //! Проверка наличия необходимых данных - Используем InitiativeValidator (обработка негативного кейса)
    const { isValid, error } = InitiativeValidator.validate({
      title,
      content,
      level,
      user_id,
    });
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Validation error", null, error));
    }

    try {
      //? За запросы в БД отвечает сервис (форматируем id под тип данных number без утилиты)
      const updatedInitiative = await InitiativeService.update(+id, {
        title,
        content,
        level,
        user_id,
      });

      //! Проверка на существование такой задачи (обработка негативного кейса)
      if (!updatedInitiative) {
        return res
          .status(404)
          .json(formatResponse(404, `Initiative with id ${id} not found`));
      }

      //* Успешный кейс
      res.status(200).json(formatResponse(200, "success", updatedInitiative));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async deleteInitiative(req, res) {
    const { id } = req.params;

    //! Проверка на валидность ID (обработка негативного кейса)
    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, "Invalid initiative ID"));
    }

    try {
      //? За запросы в БД отвечает сервис (форматируем id под тип данных number)
      const deletedInitiative = await InitiativeService.delete(reformatId(id));

      //! Проверка на существование такой задачи (обработка негативного кейса)
      if (!deletedInitiative) {
        return res
          .status(404)
          .json(formatResponse(404, `Initiative with id ${id} not found`));
      }

      //* Успешный кейс
      res.status(200);
      res
        .status(200)
        .json(
          formatResponse(200, `Initiative with id ${id} successfully deleted`)
        );
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
}

module.exports = InitiativeController;
