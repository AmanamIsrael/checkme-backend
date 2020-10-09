const taskModel = require('../../models/tasks');
const { all } = require('../../routes/lists');

exports.getAllTasksInList = (req, res) => {
    taskModel.find({
        listId: req.params.listId
    }).then((allTasks) => {
        res.json({
            msg: "Fetched all tasks successfully",
            data: allTasks
        })
    }).catch(error => {
        res.status(400).json({ err: error });
    })
}
exports.getAllTasksInAllLists = (req, res) => {
    taskModel.find({}).then((allTasks) => {
        res.json({
            msg: "Fetched all tasks successfully",
            data: allTasks
        })
    }).catch(error => {
        res.status(400).json({ err: error });
    })
}

exports.searchTask = (req, res) => {
    const task = req.body.title
    taskModel.find({ title: task }).then((allTasks) => {
        res.json({
            msg: "Fetched all tasks successfully",
            data: allTasks
        })
    }).catch(error => {
        res.status(400).json({ err: error });
    })
}

exports.addTaskToSpecifiedList = (req, res) => {
    const newTask = new taskModel({
        title: req.body.title,
        listId: req.params.listId
    });
    newTask.save().then((createdTask) => {
        res.json({
            msg: "Task created successfully",
            data: createdTask
        })
    }).catch(error => {
        res.status(400).json({ err: error });
    })
}

exports.updateTaskOnSpecifiedList = (req, res) => {
    const _listId = req.params.listId;
    const tasksId = req.params.taskId;
    if (!_listId || !tasksId) {
        res.json({
            msg: 'List id and Task id are both required'
        })
    }
    taskModel.findOneAndUpdate({ _id: tasksId, listId: _listId }, {
        $set: req.body
    }).then(() => {
        res.json({
            msg: "task updated successfully"
        })
    }).catch(error => {
        res.status(400).json({ err: error });
    })
}

exports.deleteTaskOnSpecifiedList = (req, res) => {
    const _listId = req.params.listId;
    const tasksId = req.params.taskId;
    if (!_listId || !tasksId) {
        res.json({
            msg: 'List id and Task id are both required'
        })
    }
    taskModel.findByIdAndRemove({ _id: tasksId, listId: _listId }).then((removedTask) => {
        res.json({
            msg: "successfully removed task",
            data: removedTask
        })
    })
}