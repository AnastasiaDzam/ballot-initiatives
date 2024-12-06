const { Vote } = require("../db/models");

class VoteService {
  static async getById(id) {
    return await Vote.findByPk(id);
  }

  static async getByInitiativeId(initiative_id, user_id) {
    return await Vote.findOne({ where: { initiative_id, user_id } });
  }

  static async getAllVote(user_id) {
    return await Vote.findAll({
      where: { user_id },
    });
  }
  static async createVote(user_id, initiative_id) { // 
    const newVote = await Vote.create({ user_id, initiative_id});
    console.log(newVote)
    return newVote;
  }
  
  static async deleteVote(initiative_id, user_id) {
    const deleteVoteCount = await this.getByInitiativeId(initiative_id, user_id);
    if (deleteVoteCount) {
      await deleteVoteCount.destroy();
    }
    return deleteVoteCount;
  }
}

module.exports = VoteService;
