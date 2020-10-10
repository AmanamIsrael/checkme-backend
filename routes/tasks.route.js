const router = require('express').Router();
const taskController = require('../controllers/tasks/tasks.controller');
const verify = require('../middlewares/verifyToken');

router.get('/get-tasks/user', verify, taskController.getAllTasks);
router.get('/get-tasks', verify, taskController.getTasksInList);
router.get('/search-tasks', verify, taskController.searchTask);
router.post('/create-task', verify, taskController.createTask);
router.patch('/update-task', verify, taskController.updateTask);
router.delete('/delete-task', verify, taskController.deleteTask);

module.exports = router;