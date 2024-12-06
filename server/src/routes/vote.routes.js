
const router = require("express").Router();
const VoteController = require("../controllers/Vote.controller");
const verifyAccessToken = require("../middleware/verifyAccessToken");

router
  .get("/", verifyAccessToken, VoteController.getAllVote)
  .get("/:initiative_id", verifyAccessToken, VoteController.getOneVoteItem) // покажет карточки, добавленные в избранное
  .post("/", verifyAccessToken, VoteController.createVote)
  .delete("/:initiative_id", verifyAccessToken, VoteController.deleteVote);

module.exports = router;
