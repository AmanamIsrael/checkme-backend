const router = require('express').Router();
const createTaskController = require('../controllers/tasks/tasks');
const verify = require('../middlewares/verifyToken');

router.post('/create-task', verify, createTaskController.createTask);


module.exports = router;