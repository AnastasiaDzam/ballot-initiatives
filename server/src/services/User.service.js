//сервисы нужны для реализации gcad операций с базой данных;

//для работы сервисов нужна модель базы данных
//если нет - накатить сейчас;
//try - catch здесь не пишут, а в контроллере;
const { user } = require('../db/models'); 

class UserService {
    static async getAll() {
        return await user.findAll(); //найти все;
    }

    static async getById(id) {
        return await user.findByPk(id); //найти по id;
    }

    static async create(data) {
        return await user.create(data); //создать(data - создаваемые данные); 
    }

    static async update(id, data) { //записать (id - куда записать, data - что записать);
        console.log(data);
        const user = await this.getById(id); //найти нужное по id;
        if (user) { 
            user.userName = data.userName; //меняем то, что было в сущности на данные из data;
            user.userLastName = data.userLastName; //меняем то, что было в сущности на данные из data;
            user.email = data.email;
            user.password = data.password;
            user.registration = data.registration;
            await user.save(); //сохранить
        }
        return user; //вернули новое;
    }

    static async delete(id) {  //удалить(id - что будем удалять);
        const user = await this.getById(id); //найти по id то, что нужно удалить;
        if (user) { 
            await user.destroy(); //удаляем;
        }
        return user;
    }
}

module.exports = UserService; //экспорт сервиса UserService;