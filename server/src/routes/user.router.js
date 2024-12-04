const router = require('express').Router();
const UserController = require('../controllers/User.controller');


router
.get('/', UserController.getAllUsers)
.get('/:id', UserController.getUserByID)
.post('/', UserController.createUser)
.put('/:id', UserController.updateUser)
.delete('/:id', UserController.deleteUser)


module.exports = router;