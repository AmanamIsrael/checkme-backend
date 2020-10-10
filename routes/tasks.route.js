const router = require('express').Router();
const taskController = require('../controllers/tasks/tasks.controller');
const verify = require('../middlewares/verifyToken');

// router.get('/get-tasks/:userId', verify, taskController.getAllTasksInAllLists);
router.get('/get-tasks/:listId/:authorId/tasks', verify, taskController.getTasks);
router.get('/search-tasks', verify, taskController.searchTask);
router.post('/create-task/:listId/tasks', verify, taskController.createTask);
router.patch('/update-task/:listId/tasks/:taskId', verify, taskController.updateTask);
router.delete('/delete-task/:listId/tasks/:taskId', verify, taskController.deleteTask);

module.exports = router;