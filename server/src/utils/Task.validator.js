//функция, которая проверяет корректность поступающих данных; 
class TaskValidator {
    static validate(data) {
        const { title, body } = data;

        if (!title || typeof title !== 'string' || title.trim() === '') {
            return {
                isValid: false,
                error: 'Title is required and must be a non-empty string',
            }
         } 
         else if
        (!body || typeof body !== 'string' || body.trim() === '') {
            return {
                    isValid: false,
                    error: 'Body is required and must be a non-empty string',
            }
        }
        return {
            isValid: true,
            error: null
        }
    }
}

module.exports = TaskValidator;