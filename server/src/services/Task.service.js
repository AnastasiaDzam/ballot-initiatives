class TaskService {

  static async getAll() {
    return await Task.findAll({
      include: [{ model: User }],
    });
  }

  //* Найти задачу по ID
  static async getById(id) {
    return await Task.findOne({
      where: { id },
      include: [{ model: User }],
    });
  }

  //* Создать новую задачу
  static async create(data) {
    const newTask = await Task.create(data);
    return await this.getById(newTask.id);
  }

  //* Обновить задачу по ID
  static async update(id, data) {
    const task = await this.getById(id);
    if (task) {
      task.title = data.title;
      task.body = data.body;
      await task.save();
    }
    return task; //* Возвращаем обновлённый объект или null
  }

  //* Удалить задачу по ID
  static async delete(id) {
    const task = await this.getById(id);
    if (task) {
      await task.destroy();
    }
    return task; //* Возвращаем удалённый объект или null
  }
}

module.exports = TaskService;

