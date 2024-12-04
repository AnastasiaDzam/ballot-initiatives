//ЭТО КОНТРОЛЛЕР
//Отвечает за GCAD операции с БД! 
//Получить;
//Получить по id;
//Записать;
//удалить;

const TaskService = require('../services/Task.service');
const isValidId = require('../utils/isValidId');
const reformatId = require('../utils/reformatId');
const TaskValidator = require('../utils/Task.validator');
const formatResponse = require('../utils/formatResponse');


class TaskController {  //пишем КОНТРОЛЛЕР;
    //ОБРАБОТЧИК 1. GET 
    static async getAllTasks (req, res) {  
        try { //попробуй выполнить;
            const tasks = await TaskService.getAll(); //ГЛАВНЫЙ КОД, обращается к сервису, который return await Task.findAll(); 
            if (tasks.length === 0) { //если НЕ СМОГЛИ получить tasks (===0, значит там пусто);
                return res.status(204).json(formatResponse(204, 'No tasks found', [])); //не найдено, но ошибки нет;
                //исп. утилиту formatResponse, чтобы выводить ошибку в одном виде;
            }
            return res.status(200).json(formatResponse(200, 'succeess', tasks)); // если СМОГЛИ получить task; 
        } catch ({ message }) { //если ошибка на уровне try-catch;
            console.error(message); //выводим ошибку в консоль;
            res
            .status(500) //выставляем статус у res
            .json(formatResponse(500, 'Internal server error', null, message)); //исп. утилиту formatResponse, чтобы выводить ошибку в одном виде;
        }
    }

    //ОБРАБОТЧИК 2. GETBYID 
    static async getTaskByID(req, res) {
        const { id } = req.params; //получаем id деструктуризацией из req.params;
        if(!isValidId(id)) {  //если ошибка (id не валидный);
            return res
            .status(400)
            .json(formatResponse(400, 'Invalid task Id')); //вернуть ошибку
        }
        try {
            const tasks = await TaskService.getById(reformatId(id));
            if (!tasks) {
                return res.status(404).json(formatResponse(404, `Tasks with id ${id} not found`, []));
            }
            return res.status(200).json(formatResponse(200, 'succeess', tasks));
        } catch ({ message }) {
            console.error(message); //выводим ошибку в консоль;
            res
            .status(500) //выставляем статус у res
            .json(formatResponse(500, 'Internal server error', null, message)); //исп. утилиту formatResponse, чтобы выводить ошибку в одном виде;
        }
    }

    //ОБРАБОТЧИК 3. CREATE 
    static async createTask(req, res) {
        const { title, body } = req.body;    
        const { isValid, error } = TaskValidator.validate( { title, body });

        if (!isValid) {
            return res
            .status(400)
            .json(formatResponse(400, 'Validation error', null, error));
        }
        try {
            const newTask = await TaskService.create({ title, body });
            if(!newTask) { //если НЕ СМОГЛИ получить данные;
                return res
                .status(400)
                .json(formatResponse(400, `Failed to create new task`));
            }
            return res.status(201).json(formatResponse(201, 'succeess', tasks)); // СМОГЛИ получить
        } catch ({ message }) {
            console.error(message); //выводим ошибку в консоль;
            res
            .status(500) //выставляем статус у res
            .json(formatResponse(500, 'Internal server error', null, message)); //исп. утилиту formatResponse, чтобы выводить ошибку в одном виде;
        }
    }

    //ОБРАБОТЧИК 4. UPDATE
    static async updateTask(req, res) {
        const { title, body } = req.body;
        const { isValid, error } = TaskValidator.validate( { title, body });
        if (!isValid) {
            return res
            .status(400)
            .json(formatResponse(400, 'Validation error', null, error));
        }
        try {
            const updateTask = await TaskService.update(reformatId(id), { title, body });
            if(!updateTask) { //не успешно;
                return res
                .status(400)
                .json(formatResponse(400, `Failed to update task with id ${id}`)); //дали ошибку
            }
            return res.status(200).json(formatResponse(200, 'succeess', updateTask)); // успешно; дали 200 и результат updateTask;
        } catch ({ message }) {  //если ошибка на уровне try-catch;
            console.error(message); //выводим ошибку в консоль;
            res
            .status(500) //выставляем статус у res
            .json(formatResponse(500, 'Internal server error', null, message)); //исп. утилиту formatResponse, чтобы выводить ошибку в одном виде;
        }
    }

    //ОБРАБОТЧИК 5. DELETE
    static async deleteTask(req, res) {
        const { id } = req.params; //получили id;
        if (!isValidId(id)) {
            return res
            .status(400)
            .json(formatResponse(400, 'Invalid task Id'))
        }
        try {
            const deleteTask = await TaskService.delete(id);
            if (!deleteTask) {
                return res
                .status(400)
                .json(formatResponse(400, `Failed to delete task with id ${id}`))
            }
            return res.status(200).json(formatResponse(200, 'succeess', updateTask));
        } catch ({ message }) {  //если ошибка на уровне try-catch;
            console.error(message); //выводим ошибку в консоль;
            res
            .status(500) //выставляем статус у res
            .json(formatResponse(500, 'Internal server error', null, message)); //исп. утилиту formatResponse, чтобы выводить ошибку в одном виде;
        }
    }
}


module.exports = TaskController;