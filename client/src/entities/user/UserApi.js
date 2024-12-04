import { axiosInstance } from '../../shared/lib/axiosInstance';

export default class UserApi {
  //! Метод для получения новой пары токенов
  static async refreshTokens() {
    try {
      const { data } = await axiosInstance.get('/auth/refreshTokens');
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  //! Метод для регистрации
  static async signUp(userData) {
    try {
      const { data } = await axiosInstance.post('/auth/signUp', userData);
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  //! Метод для аутентификации
  static async signIn(userData) {
    try {
      const { data } = await axiosInstance.post('/auth/signIn', userData);
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  //! Метод для выхода
  static async signOut() {
    try {
      const { data } = await axiosInstance.get('/auth/signOut');
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
}
