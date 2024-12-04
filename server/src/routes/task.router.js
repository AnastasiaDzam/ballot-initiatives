const router = require('express').Router();
const TaskController = require('../controllers/Task.controller');


router
.get('/', TaskController.getAllTasks)
.get('/:id', TaskController.getTaskByID)
.post('/', TaskController.createTask)
.put('/:id', TaskController.updateTask)
.delete('/:id', TaskController.deleteTask)


module.exports = router;