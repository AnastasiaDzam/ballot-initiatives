const TaskService = require('../services/Task.service');
const isValidId = require('../utils/isValidId');
const TaskValidator = require('../utils/Task.validator');
const formatResponse = require('../utils/formatResponse');
const reformatId = require('../utils/reformatId');

class TaskController {
  static async getAllTasks(req, res) {
    try {
      //? За запросы в БД отвечает сервис
      const tasks = await TaskService.getAll();

      //! Проверка на длину списка задач (обработка негативного кейса)
      if (tasks.length === 0) {
        //FIX - 204 статус не позволяет отдавать тело ответа, меняем на 200
        //! То есть всё прошло хорошо, контента нет
        //! было -  return res.status(204).json(formatResponse(204, 'No tasks found', []));
        //* стало
        return res.status(200).json(formatResponse(200, 'No tasks found', []));
      }

      //* Успешный кейс
      res.status(200).json(formatResponse(200, 'success', tasks));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async getTaskById(req, res) {
    const { id } = req.params;

    //! Проверка на валидность ID (обработка негативного кейса) (можно делать и не внутри try/catch)
    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, 'Invalid task ID'));
    }

    try {
      //? За запросы в БД отвечает сервис (форматируем id под тип данных number)
      const task = await TaskService.getById(reformatId(id));

      //! Проверка на существование такой задачи (обработка негативного кейса)
      if (!task) {
        return res
          .status(404)
          .json(formatResponse(404, `Task with id ${id} not found`));
      }

      //* Успешный кейс
      res.status(200).json(formatResponse(200, 'success', task));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async createTask(req, res) {
    const { title, body } = req.body;

    //* Получаем юзера из res.locals
    const { user } = res.locals;

    //! Проверка наличия необходимых данных - Используем TaskValidator (обработка негативного кейса)
    const { isValid, error } = TaskValidator.validate({ title, body });
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, 'Validation error', null, error));
    }

    try {
      //? За запросы в БД отвечает сервис
      const newTask = await TaskService.create({
        title,
        body,
        userId: user.id,
      });

      //! Проверка на существование новой задачи (обработка негативного кейса)
      if (!newTask) {
        return res
          .status(400)
          .json(formatResponse(400, `Failed to create new task`));
      }

      //* Успешный кейс
      res.status(201).json(formatResponse(201, 'success', newTask));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async updateTask(req, res) {
    const { id } = req.params;
    const { title, body } = req.body;
    const { user } = res.locals; //* Получаем юзера из res.locals

    //! Проверка на валидность ID (обработка негативного кейса)
    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, 'Invalid task ID'));
    }

    //! Проверка наличия необходимых данных - Используем TaskValidator (обработка негативного кейса)
    const { isValid, error } = TaskValidator.validate({ title, body });
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, 'Validation error', null, error));
    }

    try {
      //* Получаем задачу по id
      const taskToUpdate = await TaskService.getById(+id);

      //! Если запрашивающий операцию юзер и владелец задачи не сходятся, выбрасываем ошибку
      if (taskToUpdate.userId !== user.id) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              `No rights to update task with id ${id}`,
              null,
              `No rights to update task with id ${id}`
            )
          );
      }
      //? За запросы в БД отвечает сервис (форматируем id под тип данных number без утилиты)
      const updatedTask = await TaskService.update(+id, { title, body });

      //! Проверка на существование такой задачи (обработка негативного кейса)
      if (!updatedTask) {
        return res
          .status(404)
          .json(formatResponse(404, `Task with id ${id} not found`));
      }

      //* Успешный кейс
      res.status(200).json(formatResponse(200, 'success', updatedTask));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async deleteTask(req, res) {
    const { id } = req.params;
    const { user } = res.locals;

    //! Проверка на валидность ID (обработка негативного кейса)
    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, 'Invalid task ID'));
    }

    try {
      //* Получаем задачу по id
      const taskToDelete = await TaskService.getById(+id);

      //! Если запрашивающий операцию юзер и владелец задачи не сходятся, выбрасываем ошибку
      if (taskToDelete.userId !== user.id) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              `No rights to delete task with id ${id}`,
              null,
              `No rights to delete task with id ${id}`
            )
          );
      }
      //? За запросы в БД отвечает сервис (форматируем id под тип данных number)
      const deletedTask = await TaskService.delete(reformatId(id));

      //! Проверка на существование такой задачи (обработка негативного кейса)
      if (!deletedTask) {
        return res
          .status(404)
          .json(formatResponse(404, `Task with id ${id} not found`));
      }

      //* Успешный кейс
      res.status(200);
      res
        .status(200)
        .json(
          formatResponse(
            200,
            `Task with id ${id} successfully deleted`,
            deletedTask
          )
        );
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }
}

module.exports = TaskController;
