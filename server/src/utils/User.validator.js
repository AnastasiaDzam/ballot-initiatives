class UserValidator {
    static validateSignUp(data) {
      const { username, email, password } = data;
      if (!username || typeof username !== 'string' || username.trim() === '') {
        return {
          isValid: false,
          error: 'Username is required and must be a non-empty string.',
        };
      }
      if (
        !email ||
        typeof email !== 'string' ||
        email.trim() === '' ||
        !this.validateEmail(email)
      ) {
        return {
          isValid: false,
          error:
            'Email is required, must be a non-empty string, and must be a valid email address.', // Более детальное сообщение об ошибке
        };
      }
      if (
        !password ||
        typeof password !== 'string' ||
        password.trim() === '' ||
        !this.validatePassword(password)
      ) {
        return {
          isValid: false,
          error:
            'Password is required, must be a non-empty string, contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.', // Подробное сообщение об ошибке
        };
      }
      return {
        isValid: true,
        error: null,
      };
    }
    static validateSignIn(data) {
      const { email, password } = data;
  
      if (
        !email ||
        typeof email !== 'string' ||
        email.trim() === '' ||
        !this.validateEmail(email)
      ) {
        return {
          isValid: false,
          error: 'Email is required and must be a valid email address.',
        };
      }
      if (!password || typeof password !== 'string' || password.trim() === '') {
        return {
          isValid: false,
          error: 'Password is required and must not be an empty string.',
        };
      }
      return {
        isValid: true,
        error: null,
      };
    }
    static validateEmail(email) {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailPattern.test(email);
    }
  
    static validatePassword(password) {
      // Регулярные выражения для проверки требований к паролю
      const hasUpperCase = /[A-Z]/; // Проверка на наличие заглавной буквы
      const hasLowerCase = /[a-z]/; // Проверка на наличие строчной буквы
      const hasNumbers = /\d/; // Проверка на наличие цифры
      const hasSpecialCharacters = /[!@#$%^&*()-,.?":{}|<>]/; // Проверка на наличие спецсимвола
      const isValidLength = password.length >= 8; // Проверка на минимальную длину
  
      // Проверка всех условий
      if (
        !hasUpperCase.test(password) ||
        !hasLowerCase.test(password) ||
        !hasNumbers.test(password) ||
        !hasSpecialCharacters.test(password) ||
        !isValidLength
      ) {
        return false;
      } else {
        return true;
      }
    }
  }
  
  module.exports = UserValidator;
  