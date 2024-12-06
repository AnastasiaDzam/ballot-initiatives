const VoteService = require("../services/Vote.service");
const formatResponse = require("../utils/formatResponse");

class VoteController {
  static async getOneVoteItem(req, res) {
    try {
      const { user } = res.locals;
      const user_id = user.id;
      const { initiative_id } = req.params;
      const vote = await VoteService.getByInitiativeId(initiative_id, user_id);
      if (!vote) {
        return res
          .status(404)
          .json(formatResponse(404, "Not found", null, "Not found"));
      }
      return res.status(200).json(formatResponse(200, "success", vote));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async getAllVote(req, res) {
    try {
      const { user } = res.locals;
      const user_id = user.id;
      const votes = await VoteService.getAllVote(user_id);
      return res.status(200).json(formatResponse(200, "success", votes));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async createVote(req, res) {
    try {
      const { user } = res.locals;
      const user_id = user.id;
      const { initiative_id } = req.body; //
      console.log(initiative_id);
      const vote = await VoteService.createVote(user_id, initiative_id); //
      return res.status(201).json(formatResponse(201, "success", vote));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async deleteVote(req, res) {
    const { user } = res.locals;
    const user_id = user.id;

    const { initiative_id } = req.params;

    try {
      const voteToDelete = await VoteService.getByInitiativeId(
        initiative_id,
        user_id
      );

      if (voteToDelete && voteToDelete.user_id !== user_id) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              "No rights to delete like",
              null,
              "No rights to delete like"
            )
          );
      }
      const deleteVote = await VoteService.deleteVote(initiative_id, user_id);
      res
        .status(200)
        .json(formatResponse(200, `Vote successfully deleted`, deleteVote));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
}

module.exports = VoteController;
