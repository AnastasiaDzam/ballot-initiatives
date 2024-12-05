import { axiosInstance } from '../../shared/lib/axiosInstance';

class InitiativeApi {
  static async getInitiatives() {
    try {
      const { data } = await axiosInstance.get('/initiative');
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async getInitiativeById(id) {
    try {
      const { data } = await axiosInstance.get(`/initiative/${id}`);
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async createInitiative(newInitiative) {
    try {
      const { data } = await axiosInstance.post('/initiative', newInitiative);
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async deleteInitiativeById(id) {
    try {
      const { data } = await axiosInstance.delete(`/initiative/${id}`);
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async updateInitiativeById(id, updatedInitiative) {
    try {
      const { data } = await axiosInstance.put(`/initiative/${id}`, updatedInitiative);
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export default InitiativeApi;
