//сервисы нужны для реализации gcad операций с базой данных;

//для работы сервисов нужна модель базы данных
//если нет - накатить сейчас;
//try - catch здесь не пишут, а в контроллере;
const { Task } = require('../db/models'); 

class TaskService {
    static async getAll() {
        return await Task.findAll(); //найти все;
    }

    static async getById(id) {
        return await Task.findByPk(id); //найти по id;
    }

    static async create(data) {
        return await Task.create(data); //создать(data - создаваемые данные); 
    }

    static async update(id, data) { //записать (id - куда записать, data - что записать);
        const task = await this.getById(id); //найти нужное по id;
        if (task) { 
            task.title = data.title; //меняем то, что было в сущности на данные из data;
            task.body = data.body; //меняем то, что было в сущности на данные из data;
            await task.save(); //сохранить
        }
        return task; //вернули новое;
    }

    static async delete(id) {  //удалить(id - что будем удалять);
        const task = await this.getById(id); //найти по id то, что нужно удалить;
        if (task) { 
            await task.destroy(); //удаляем;
        }
        return task;
    }
}

module.exports = TaskService; //экспорт сервиса TaskService;