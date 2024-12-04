//ЭТО КОНТРОЛЛЕР
//Отвечает за GCAD операции с БД! 
//Получить;
//Получить по id;
//Записать;
//удалить;

const UserService = require('../services/User.service');
const isValidId = require('../utils/isValidId');
const reformatId = require('../utils/reformatId');
const UserValidator = require('../utils/User.validator');
const formatResponse = require('../utils/formatResponse');


class UserController {  //пишем КОНТРОЛЛЕР;
    //ОБРАБОТЧИК 1. GET 
    static async getAllUsers (req, res) {  
        try { //попробуй выполнить;
            const users = await UserService.getAll(); //ГЛАВНЫЙ КОД, обращается к сервису, который return await Task.findAll(); 
            if (users.length === 0) { //если НЕ СМОГЛИ получить users (===0, значит там пусто);
                return res.status(204).json(formatResponse(204, 'No users found', [])); //не найдено, но ошибки нет;
                //исп. утилиту formatResponse, чтобы выводить ошибку в одном виде;
            }
            return res.status(200).json(formatResponse(200, 'succeess', users)); // если СМОГЛИ получить task; 
        } catch ({ message }) { //если ошибка на уровне try-catch;
            console.error(message); //выводим ошибку в консоль;
            res
            .status(500) //выставляем статус у res
            .json(formatResponse(500, 'Internal server error', null, message)); //исп. утилиту formatResponse, чтобы выводить ошибку в одном виде;
        }
    }

    //ОБРАБОТЧИК 2. GETBYID 
    static async getUserByID(req, res) {
        const { id } = req.params; //получаем id деструктуризацией из req.params;
        if(!isValidId(id)) {  //если ошибка (id не валидный);
            return res
            .status(400)
            .json(formatResponse(400, 'Invalid user Id')); //вернуть ошибку
        }
        try {
            const users = await UserService.getById(reformatId(id));
            if (!users) {
                return res.status(404).json(formatResponse(404, `User with id ${id} not found`, []));
            }
            return res.status(200).json(formatResponse(200, 'succeess', users));
        } catch ({ message }) {
            console.error(message); //выводим ошибку в консоль;
            res
            .status(500) //выставляем статус у res
            .json(formatResponse(500, 'Internal server error', null, message)); //исп. утилиту formatResponse, чтобы выводить ошибку в одном виде;
        }
    }

    //ОБРАБОТЧИК 3. CREATE 
    static async createUser(req, res) {
        const { userName, userLastName, email, password, registration } = req.body;    
        const { isValid, error } = UserValidator.validate({ userName, userLastName, email, password, registration });

        if (!isValid) {
            return res
            .status(400)
            .json(formatResponse(400, 'Validation error', null, error));
        }
        try {
            const newUser = await UserService.create({ userName, userLastName, email, password, registration });
            if(!newUser) { //если НЕ СМОГЛИ получить данные;
                return res
                .status(400)
                .json(formatResponse(400, `Failed to create new user`));
            }
            return res.status(201).json(formatResponse(201, 'succeess', newUser)); // СМОГЛИ получить
        } catch ({ message }) {
            console.error(message); //выводим ошибку в консоль;
            res
            .status(500) //выставляем статус у res
            .json(formatResponse(500, 'Internal server error', null, message)); //исп. утилиту formatResponse, чтобы выводить ошибку в одном виде;
        }
    }

    //ОБРАБОТЧИК 4. UPDATE
    static async updateUser(req, res) {
        // console.log(req.body)
        const { userName, userLastName, email, password, registration } = req.body;
        const { isValid, error } = UserValidator.validate({ userName, userLastName, email, password, registration });
        // console.log(1111);
        if (!isValid) {
            return res
            .status(400)
            .json(formatResponse(400, 'Validation error', null, error));
        }
        
        
        try {
            const updateUser = await UserService.update(reformatId(req.params.id), { userName, userLastName, email, password, registration });
            if(!updateUser) { //не успешно;
                return res
                .status(400)
                .json(formatResponse(400, `Failed to update user with id ${id}`)); //дали ошибку
            }
            return res.status(200).json(formatResponse(200, 'succeess', updateUser)); // успешно; дали 200 и результат updateTask;
        } catch ({ message }) {  //если ошибка на уровне try-catch;
            console.error(message); //выводим ошибку в консоль;
            res
            .status(500) //выставляем статус у res
            .json(formatResponse(500, 'Internal server error', null, message)); //исп. утилиту formatResponse, чтобы выводить ошибку в одном виде;
        }
    }


    //ОБРАБОТЧИК 5. DELETE
    static async deleteUser(req, res) {
        const { id } = req.params; //получили id;
        if (!isValidId(id)) {
            return res
            .status(400)
            .json(formatResponse(400, 'Invalid user Id'))
        }
        try {
            const deleteUser = await UserService.delete(id);
            if (!deleteUser) {
                return res
                .status(400)
                .json(formatResponse(400, `Failed to delete user with id ${id}`))
            }
            return res.status(200).json(formatResponse(200, 'succeess', deleteUser));
        } catch ({ message }) {  //если ошибка на уровне try-catch;
            console.error(message); //выводим ошибку в консоль;
            res
            .status(500) //выставляем статус у res
            .json(formatResponse(500, 'Internal server error', null, message)); //исп. утилиту formatResponse, чтобы выводить ошибку в одном виде;
        }
    }
}


module.exports = UserController;