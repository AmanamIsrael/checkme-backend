const router = require('express').Router();
const taskController = require('../controllers/tasks/tasks');
const verify = require('../middlewares/verifyToken');

router.get('/get-tasks', verify, taskController.getAllTasksInAllLists);
router.get('/get-tasks/:listId/tasks', verify, taskController.getAllTasksInList);
router.get('/search-tasks', verify, taskController.searchTask);
router.post('/add-task/:listId/tasks', verify, taskController.addTaskToSpecifiedList);
router.patch('/update-task/:listId/tasks/:taskId', verify, taskController.updateTaskOnSpecifiedList);
router.delete('/delete-task/:listId/tasks/:taskId', verify, taskController.deleteTaskOnSpecifiedList);

module.exports = router;