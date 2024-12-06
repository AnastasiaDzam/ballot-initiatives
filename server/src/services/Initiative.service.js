const { Initiative, User } = require("../db/models");

class InitiativeService {
  //* Получить все задачи
  static async getAll() {
    return await Initiative.findAll({
      include: [{ model: User }],
    });
  }

  //* Найти задачу по ID
  static async getById(id) {
    return await Initiative.findOne({
      where: { id },
      include: [{ model: User }],
    });
  }

  //* Создать новую задачу
  static async create(data) {
    const newInitiative = await Initiative.create(data);
    return await this.getById(newInitiative.id);
  }

  //* Обновить задачу по ID
  static async update(id, data) {
    const initiative = await this.getById(id);
    if (initiative) {
      initiative.title = data.title;
      initiative.content = data.content;
      initiative.level = data.level;
      // initiative.user_id = data.user_id;
      await initiative.save();
    }
    return initiative; //* Возвращаем обновлённый объект или null
  }

  //* Удалить задачу по ID
  static async delete(id) {
    const initiative = await this.getById(id);
    if (initiative) {
      await initiative.destroy();
    }
    return initiative; //* Возвращаем удалённый объект или null
  }
}

module.exports = InitiativeService;
