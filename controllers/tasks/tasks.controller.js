const taskModel = require('../../models/tasks.model');
const listModel = require('../../models/lists.model');

exports.getAllTasks = async(req, res) => {
    const authorId = req.query.authorId;
    if (!authorId) {
        res.json({
            msg: "authorid & alltasks is required"
        })
    }
    try {
        const allTasks = await taskModel.find({ author: authorId });
        res.json({
            msg: "Fetched all tasks successfully",
            data: allTasks
        })
    } catch (error) {
        res.status(400).json({ error });
    }
}

exports.getTasksInList = async(req, res) => {
        try {
            const allTasks = await taskModel.find({
                listId: req.query.listId,
                author: req.query.authorId
            })
            res.json({
                msg: "Fetched all tasks successfully",
                data: allTasks
            })
        } catch (error) {
            res.status(400).json({ error });
        }
    }
    // not efficient yet!
exports.searchTask = async(req, res) => {
    const task = req.body.title;
    if (!task) {
        res.json({
            msg: "task is required"
        })
    }
    try {
        const allTasks = await taskModel.find({ title: task });
        res.json({
            msg: "Fetched all tasks successfully",
            data: allTasks
        })
    } catch (error) {
        res.status(400).json({ error });
    }
}

exports.createTask = async(req, res) => {
    const listId = req.query.listId;
    const title = req.body.title;
    const author = req.body.author;
    if (!listId || !title || !author) {
        res.json({
            msg: "listid & title & author is required"
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

exports.updateTask = async(req, res) => {
    const _listId = req.query.listId;
    const tasksId = req.query.listId;
    const authorId = req.body.author;
    if (!_listId || !tasksId || !authorId) {
        res.json({
            msg: "_listid & tasksid & authorid is required"
        })
    }
    try {
        await taskModel.findOneAndUpdate({ _id: tasksId, listId: _listId, author: authorId }, {
            $set: req.body
        });
        res.json({
            msg: "task updated successfully"
        })
    } catch (error) {
        res.status(400).json({ error });
    }
}

exports.deleteTask = async(req, res) => {
    const _listId = req.query.listId;
    const tasksId = req.query.listId;
    const authorId = req.body.author;
    if (!_listId || !tasksId || !authorId) {
        res.json({
            msg: "_listid & tasksid & authorid is required"
        })
    }
    try {
        await taskModel.findByIdAndRemove({ _id: tasksId, listId: _listId, author: authorId });
        res.json({
            msg: "successfully removed task"
        })
    } catch (error) {
        res.status(400).json({ error });
    }
}

exports.completeTask = async(req, res) => {
    const _listId = req.query.listId;
    if (!_listId) {
        res.json({
            msg: "_listid is required"
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