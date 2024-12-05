
const voteRouter = require('express').Router();
const VoteServices = require('../services/Vote.service')
const verifyAccessToken = require('../middleware/verifyAccessToken')


voteRouter.post('/', verifyAccessToken, async (req, res) => {
  try {
    const { user_id, initiative_id } = req.body;
    const newVote = await VoteServices.createVote({
      user_id, initiative_id
    });
    res.status(201).json({ message: 'success', newVote });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});
voteRouter.delete('/:user_id/:initiative_id', verifyAccessToken, async (req, res) => {
  try {
    const { user_id, initiative_id } = req.params;
    const deleteVote=await VoteServices.deleteVote(user_id, initiative_id)
    deleteVote ? res.sendStatus(200) : res.sendStatus(404);
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = voteRouter;
