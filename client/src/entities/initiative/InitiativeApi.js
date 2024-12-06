import { axiosInstance } from "../../shared/lib/axiosInstance";

class InitiativeApi {
  static async getInitiatives() {
    try {
      const { data } = await axiosInstance.get("/initiative");
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

  static async getVoteByInitiativeId(id){
    try {
      const { data } = await axiosInstance.get(`/vote/${id}`);
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
  // static async createInitiative(newInitiative) {
  //   try {
  //     const { data } = await axiosInstance.post('/initiative', newInitiative);
  //     return data;
  //   } catch (error) {
  //     return error.response.data;
  //   }
  // }
  static async addToVote(initiative_id) {
    try {
      
      const { data } = await axiosInstance.post("/vote", {
        initiative_id,
      });
       console.log(data,222222);
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async deleteFromVote(initiative_id) {
    try {
      console.log(initiative_id);
      
      const { data } = await axiosInstance.delete(`/vote/${initiative_id}`);
      console.log(data);
      
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async getAllVotes() {
    try {
      const { data } = await axiosInstance.get("/vote"); 
      return data; 
    } catch (error) {
      console.error(error);
      return error.response.data;
    }
  }

  // static async deleteInitiativeById(id) {
  //   try {
  //     const { data } = await axiosInstance.delete(`/initiative/${id}`);
  //     return data;
  //   } catch (error) {
  //     return error.response.data;
  //   }
  // }
  
  // static async updateInitiativeById(id, updatedInitiative) {
  //   try {
  //     const { data } = await axiosInstance.put(`/initiative/${id}`, updatedInitiative);
  //     return data;
  //   } catch (error) {
  //     return error.response.data;
  //   }
  // }
}

export default InitiativeApi;
