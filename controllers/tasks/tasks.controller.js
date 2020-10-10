const taskModel = require('../../models/tasks.model');
const listModel = require('../../models/lists.model');

exports.getAllTasksInAllLists = (req, res) => {
    const id = req.params.userId;
    taskModel.find({ author: id }).then((allTasks) => {
        res.json({
            msg: "Fetched all tasks successfully",
            data: allTasks
        })
    }).catch(error => {
        res.status(400).json({ err: error });
    })
}

exports.getTasks = (req, res) => {
        taskModel.find({
            listId: req.params.listId,
            author: req.params.authorId
        }).then((allTasks) => {
            res.json({
                msg: "Fetched all tasks successfully",
                data: allTasks
            })
        }).catch(error => {
            res.status(400).json({ err: error });
        })
    }
    // not efficient yet!
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

exports.createTask = async(req, res) => {
    const listId = req.params.listId;
    const title = req.body.title;
    const author = req.body.author;
    if (!listId || !title || !author) {
        res.json({
            msg: 'List id, title and author is required'
        })
    }
    const newTask = new taskModel({
        title,
        listId,
        author
    });
    const savedTask = await newTask.save();
    const list = await listModel.findById({ _id: listId });
    await list.createdTasks.push(savedTask);
    await list.save().then(() => {
        res.json({
            msg: 'List added successfully',
            data: newTask
        })
    }).catch(error => {
        res.status(400).json({ err: error });
    });
}

exports.updateTask = (req, res) => {
    const _listId = req.params.listId;
    const tasksId = req.params.taskId;
    const authorId = req.body.author;
    if (!_listId || !tasksId || !authorId) {
        res.json({
            msg: 'List id, Task id and !author id are required'
        })
    }
    taskModel.findOneAndUpdate({ _id: tasksId, listId: _listId, author: authorId }, {
        $set: req.body
    }).then(() => {
        res.json({
            msg: "task updated successfully"
        })
    }).catch(error => {
        res.status(400).json({ err: error });
    })
}

exports.deleteTask = (req, res) => {
    const _listId = req.params.listId;
    const tasksId = req.params.taskId;
    const authorId = req.body.author;
    if (!_listId || !tasksId || !authorId) {
        res.json({
            msg: 'List id, Task id and !author id are required'
        })
    }
    taskModel.findByIdAndRemove({ _id: tasksId, listId: _listId, author: authorId }).then((removedTask) => {
        res.json({
            msg: "successfully removed task",
            data: removedTask
        })
    })
}