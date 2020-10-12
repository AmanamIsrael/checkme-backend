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
    try {
        const task = req.body.title;
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
    try {
        const listId = req.query.listId;
        const title = req.body.title;
        const author = req.body.author;
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
    try {
        const _listId = req.query.listId;
        const tasksId = req.query.listId;
        const authorId = req.body.author;
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
    try {
        const _listId = req.query.listId;
        const tasksId = req.query.listId;
        const authorId = req.body.author;
        const removedTask = await taskModel.findByIdAndRemove({ _id: tasksId, listId: _listId, author: authorId });
        res.json({
            msg: "successfully removed task"
        })
    } catch (error) {
        res.status(400).json({ error });
    }
}

exports.completeTask = async(req, res) => {
    try {
        const _listId = req.query.listId;
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