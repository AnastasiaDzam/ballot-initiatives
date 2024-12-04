//NOTE `bcrypt` — это библиотека для безопасного хэширования паролей, которая широко используется в приложениях для обеспечения безопасности. Основные функции и особенности `bcrypt` включают:

//* 1. Хэширование паролей: `bcrypt` позволяет преобразовать пароль в зашифрованный вид. Этот процесс называется хэшированием. Хэшированные пароли сохраняются в базе данных вместо открытых паролей, что повышает безопасность. Даже если злоумышленник получит доступ к базе данных, он не сможет видеть открытые пароли.

//* 2. Соль: Один из ключевых аспектов `bcrypt` — использование соли при хэшировании. Соль — это случайная последовательность данных, которая добавляется к паролю перед его хэшированием. Это предотвращает атаки по предварительно вычисленным (rainbow table) таблицам, так как даже одинаковые пароли будут иметь разные хэши благодаря уникальным солям.  Например, если у вас есть пароль `password123` и соль `randomSalt`, то осуществляется хэширование строки `password123randomSalt`.

//* 3. Итерации: `bcrypt` позволяет настраивать количество итераций (или "раундов") хэширования. Чем больше итераций, тем больше времени потребуется для вычисления хэша. Это делает хэши более стойкими к атакам, но также увеличивает время, необходимое для выполнения операций хэширования и проверки. Обычно рекомендуется использовать не менее 10 итераций.

//* 4. Сравнение паролей: Метод `bcrypt.compare()` позволяет безопасно сравнивать открытый пароль с хэшированным значением хэша. Этот метод учитывает соль и количество итераций при проверке пароля.

const bcrypt = require('bcrypt');
const UserService = require('../services/User.service');
const formatResponse = require('../utils/formatResponse');
const UserValidator = require('../utils/User.validator');
const cookiesConfig = require('../config/cookiesConfig');
const generateTokens = require('../utils/generateTokens');

class UserController {
  /**
   * Метод для обновления токенов доступа и обновления.
   */
  static async refreshTokens(req, res) {
    try {
      //? Извлекаем информацию о пользователе из локальных переменных ответа
      const { user } = res.locals;

      //? Генерируем новые токены доступа и обновления для текущего пользователя
      const { accessToken, refreshToken } = generateTokens({ user });

      //? Отправляем клиенту ответ с новыми токенами и устанавливаем новый refresh токен в куки
      //* Устанавливаем статус ответа 200 (Успешно)
      //* Устанавливаем новую куку для refresh токена
      //* // Возвращаем информацию о пользователе и токен
      res.status(200).cookie('refreshToken', refreshToken, cookiesConfig).json(
        formatResponse(200, 'Successfully generated new tokens', {
          user,
          accessToken,
        })
      );
    } catch ({ message }) {
      //! Обрабатываем возможные ошибки, которые могут возникнуть в блоке try
      console.error(message);

      //! Отправляем ответ с ошибкой
      //! Устанавливаем статус 500 (Внутренняя ошибка сервера)
      //! Формируем ответ с сообщением об ошибке
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  /**
   * Метод для регистрации нового пользователя.
   */
  static async signUp(req, res) {
    //? Извлекаем email, имя пользователя и пароль из тела запроса
    const { email, username, password } = req.body;

    //! Валидируем данные, используя валидатор
    const { isValid, error } = UserValidator.validateSignUp({
      email,
      username,
      password,
    });

    //! Если данные не прошли валидацию, отправляем клиенту сообщение об ошибке 400
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, 'Validation error', null, error));
    }

    //* Приводим email к нижнему регистру
    const normalizedEmail = email.toLowerCase();

    try {
      //? Проверяем, существует ли уже пользователь с таким email
      const userFound = await UserService.getByEmail(normalizedEmail);

      //! Если пользователь найден, отправляем сообщение об ошибке
      if (userFound) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              'A user with this email already exists',
              null,
              'A user with this email already exists'
            )
          );
      }

      //* Хэшируем пароль перед сохранением
      const hashedPassword = await bcrypt.hash(password, 10);

      //* Создаем нового пользователя в базе данных
      const newUser = await UserService.create({
        email: normalizedEmail,
        username,
        password: hashedPassword,
      });

      //* Преобразуем объект нового пользователя в обычный объект
      const plainUser = newUser.get({ plain: true });
      delete plainUser.password; //! Удаляем пароль перед отправкой пользователю

      //* Отправляем ответ с успешным входом и данными пользователя и выставляем куку
      const { accessToken, refreshToken } = generateTokens({ user: plainUser });
      res
        .status(201)
        .cookie('refreshToken', refreshToken, cookiesConfig)
        .json(
          formatResponse(201, 'Login successful', {
            user: plainUser,
            accessToken,
          })
        );
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  /**
   * Метод для входа пользователя.
   */
  static async signIn(req, res) {
    //? Извлекаем email и пароль из тела запроса
    const { email, password } = req.body;

    //? Валидируем данные для входа
    const { isValid, error } = UserValidator.validateSignIn({
      email,
      password,
    });

    //! Если данные не прошли валидацию, отправляем сообщение об ошибке
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, 'Validation error', null, error));
    }

    //* Приводим email к нижнему регистру
    const normalizedEmail = email.toLowerCase();

    try {
      //* Ищем пользователя в базе данных по email
      const user = await UserService.getByEmail(normalizedEmail);

      //! Если пользователь не найден, отправляем сообщение об ошибке
      if (!user) {
        return res
          .status(404)
          .json(
            formatResponse(
              404,
              'User with this email not found',
              null,
              'User with this email not found'
            )
          );
      }

      //* Сравниваем введенный пароль с хэшированным паролем пользователя
      const isPasswordValid = await bcrypt.compare(password, user.password);

      //! Если пароли не совпадают, отправляем сообщение об ошибке
      if (!isPasswordValid) {
        return res
          .status(401)
          .json(
            formatResponse(401, 'Invalid password.', null, 'Invalid password.')
          );
      }

      //* Преобразуем объект пользователя в обычный объект
      const plainUser = user.get({ plain: true });
      delete plainUser.password; //! Удаляем пароль перед отправкой пользователю

      //* Отправляем ответ с успешным входом и данными пользователя и выставляем куку
      const { accessToken, refreshToken } = generateTokens({ user: plainUser });
      res
        .status(200)
        .cookie('refreshToken', refreshToken, cookiesConfig)
        .json(
          formatResponse(200, 'Login successful', {
            user: plainUser,
            accessToken,
          })
        );
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  /**
   * Метод для выхода пользователя.
   */
  static async signOut(req, res) {
    console.log(req.cookies);
    try {
      //* Чистим куку refreshToken и отправляем ответ об успешном выходе пользователя
      res
        .clearCookie('refreshToken')
        .json(formatResponse(200, 'Logout successful'));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }
}

module.exports = UserController;
