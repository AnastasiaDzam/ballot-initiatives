
const { Vote } = require('../db/models')

class VoteServices {

  static getOneVote = async (user_id, initiative_id) => {
    const voteInDb = await Vote.findOne({ where: { user_id, initiative_id } })
    return voteInDb ? true : false
  }
  static createVote = async ({ user_id, initiative_id }) => {

    const voteIn = await this.getOneVote(user_id, initiative_id);
    if (voteIn) {
      return 'vote already';
    }
    const vote = await Vote.create({ user_id, initiative_id });
    return vote.get();
  };

  static deleteVote= async (user_id, initiative_id)=>{
    const voteIn = await this.getOneVote(user_id, initiative_id);
    if (voteIn) {
     await Vote.destroy({where : { user_id, initiative_id }});
    return 'vote delete' ;
    }
    
    return 'vote no';

  }

}

module.exports = VoteServices;