const taskModel = require('../../models/tasks.model');
const listModel = require('../../models/lists.model');

exports.getAllTasks = async(req, res) => {
    try {
        const authorId = req.query.authorId;
        const allTasks = await taskModel.find({ author: authorId });
        console.log(allTasks);
        res.json({
            msg: "Fetched all tasks successfully",
            data: allTasks
        })
    } catch (error) {
        res.status(400).json({ error });
    }
}

exports.getTasksInList = (req, res) => {
        taskModel.find({
            listId: req.query.listId,
            author: req.query.authorId
        }).then((allTasks) => {
            res.json({
                msg: "Fetched all tasks successfully",
                data: allTasks
            })
        }).catch(error => {
            res.status(400).json({ error });
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
        res.status(400).json({ error });
    })
}

exports.createTask = async(req, res) => {
    const listId = req.query.listId;
    const title = req.body.title;
    const author = req.body.author;
    if (!listId || !title || !author) {
        res.json({
            msg: 'List id, Title or Author is required'
        })
    }
    try {
        const newTask = new taskModel({
            title,
            listId,
            author
        });
        const savedTask = await newTask.save();
        const list = await listModel.findById({ _id: listId });
        await list.createdTasks.push(savedTask);
        await list.save();
        res.json({
            msg: 'List added successfully',
            data: newTask
        })
    } catch (error) {
        res.status(400).json({ error });
    }
}

exports.updateTask = (req, res) => {
    const _listId = req.query.listId;
    const tasksId = req.query.listId;
    const authorId = req.body.author;
    if (!_listId || !tasksId || !authorId) {
        res.json({
            msg: 'List id, Task id or Author id are required'
        })
    }
    taskModel.findOneAndUpdate({ _id: tasksId, listId: _listId, author: authorId }, {
        $set: req.body
    }).then(() => {
        res.json({
            msg: "task updated successfully"
        })
    }).catch(error => {
        res.status(400).json({ error });
    })
}

exports.deleteTask = (req, res) => {
    const _listId = req.query.listId;
    const tasksId = req.query.listId;
    const authorId = req.body.author;
    if (!_listId || !tasksId || !authorId) {
        res.json({
            msg: 'List id, Task id or Author id are required'
        })
    }
    taskModel.findByIdAndRemove({ _id: tasksId, listId: _listId, author: authorId }).then((removedTask) => {
        res.json({
            msg: "successfully removed task",
            data: removedTask
        })
    })
}

exports.completeTask = async(req, res) => {
    const _listId = req.query.listId;
    if (!_listId) {
        res.json({
            msg: "Task id or Author id is required"
        })
    }
    try {
        const task = await taskModel.findOne({ listId: _listId });
        task.completed = true;
        await task.save();
        res.json({
            msg: "Successfully set task to completed"
        })
    } catch (error) {
        res.status(400).json({ error });
    }
}