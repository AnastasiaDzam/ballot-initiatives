//функция, которая проверяет корректность поступающих данных; 
class UserValidator {
    static validate(data) {
        const { userName, userLastName, email, password, registration } = data;

        if (!userName || typeof userName !== 'string' || userName.trim() === '') {
            return {
                isValid: false,
                error: 'userName is required and must be a non-empty string',
            }
         } 
         else if
        (!userLastName || typeof userLastName !== 'string' || userLastName.trim() === '') {
            return {
                    isValid: false,
                    error: 'userLastName is required and must be a non-empty string',
            }
        }
        else if
        (!email || typeof email !== 'string' || email.trim() === '') {
            return {
                    isValid: false,
                    error: 'email is required and must be a non-empty string',
            }
        }
        else if
        (!password || typeof password !== 'string' || password.trim() === '') {
            return {
                    isValid: false,
                    error: 'password is required and must be a non-empty string',
            }
        }
        else if
        (!registration || typeof registration !== 'string' || registration.trim() === '') {
            return {
                    isValid: false,
                    error: 'registration is required and must be a non-empty string',
            }
        }
        return {
            isValid: true,
            error: null
        }
    }
}

module.exports = UserValidator;