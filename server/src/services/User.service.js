const { User } = require('../db/models');

class UserService {
  /**
   * Метод для создания нового пользователя.
   * @param {object} data - Данные пользователя, которые необходимо сохранить.
   * @returns {Promise<object>} - Возвращает Promise с созданным пользователем.
   */
  static async create(data) {
    return await User.create(data); // Создание нового пользователя с использованием метода create модели User
  }

  /**
   * Метод для получения пользователя по email.
   * @param {string} email - Email пользователя, по которому осуществляется поиск.
   * @returns {Promise<object|null>} - Возвращает Promise с найденным пользователем или null, если пользователь не найден.
   */
  static async getByEmail(email) {
    return await User.findOne({ where: { email } }); // Ищем пользователя в базе данных по указанному email с помощью метода findOne
  }
}

module.exports = UserService; // Экспортируем класс UserService для использования в других модулях
