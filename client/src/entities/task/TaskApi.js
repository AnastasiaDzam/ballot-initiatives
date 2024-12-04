//NOTE - все методы возвращают данные с бэка, которые предварительно мы 'расджейсонили'
//NOTE - все методы возвращают единую структуру данных - { statusCode, message, data, error }
//NOTE - достигается это засчет того, что наш бэк очень предсказуем и всегда отдает единую структуру ответа

import { axiosInstance } from '../../shared/lib/axiosInstance';

class TaskApi {
  //! Метод для получения всех задач
  static async getTasks() {
    try {
      const { data } = await axiosInstance.get('/tasks');
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  //! Метод для получения одной задачи по id
  static async getTaskById(id) {
    try {
      const { data } = await axiosInstance.get(`/tasks/${id}`);
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  //! Метод для создания одной задачи
  static async createTask(newTask) {
    try {
      const { data } = await axiosInstance.post('/tasks', newTask);
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  //! Метод для удаления одной задачи по id
  static async deleteTaskById(id) {
    try {
      const { data } = await axiosInstance.delete(`/tasks/${id}`);
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  //! Метод для изменения одной задачи по id
  static async updateTaskById(id, updatedTask) {
    try {
      const { data } = await axiosInstance.put(`/tasks/${id}`, updatedTask);
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export default TaskApi;
