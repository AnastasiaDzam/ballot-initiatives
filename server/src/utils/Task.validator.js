
class TaskValidator {

  static validate(data) {
    const { title, body } = data; // Деструктуризация объекта данных для получения полей title и body.

    //! Проверка валидности поля title
    if (!title || typeof title !== 'string' || title.trim() === '') {
      // Если title отсутствует, не является строкой или является пустой строкой
      return {
        isValid: false, // Данные невалидные
        error: 'Title is required and must be a non-empty string.', // Возвращаем сообщение об ошибке
      };
    }

    //! Проверка валидности поля body
    if (!body || typeof body !== 'string' || body.trim() === '') {
      // Если body отсутствует, не является строкой или является пустой строкой
      return {
        isValid: false, // Данные невалидные
        error: 'Body is required and must be a non-empty string.', // Возвращаем сообщение об ошибке
      };
    }

    //* Если все проверки пройдены, возвращаем валидный результат.
    return {
      isValid: true, // Данные валидные
      error: null, // Нет ошибок
    };
  }
}

module.exports = TaskValidator;

