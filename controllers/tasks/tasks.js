const tasksModel = require('../../models/tasks');

exports.createTask = async(req, res) => {
    const task = req.body.task;
    try {
        res.json(task);
    } catch (error) {
        res.status(400).json({ err: error });
    }
}