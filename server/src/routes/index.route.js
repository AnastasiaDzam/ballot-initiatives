const router = require('express').Router();
const TaskRouter = require('./task.router');
const formatResponse = require('../utils/formatResponse');

router.use('/tasks', TaskRouter);

router.use('*', (req, res) => {
    res.status(404).json(formatResponse(404, 'Not found'));
});


module.exports = router;