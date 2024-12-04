const router = require('express').Router();
const UserRouter = require('./user.router');
const formatResponse = require('../utils/formatResponse');

router.use('/users', UserRouter);

router.use('*', (req, res) => {
    res.status(404).json(formatResponse(404, 'Not found'));
});


module.exports = router;