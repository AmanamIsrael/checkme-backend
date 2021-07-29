const taskModel = require("../../models/tasks.model");
const listModel = require("../../models/lists.model");

exports.getAllTasks = async (req, res) => {
  const authorId = req.query.authorId;
  if (!authorId) {
    res.json({
      msg: "authorid & alltasks is required",
    });
  }
  try {
    const allTasks = await taskModel.find({ author: authorId });
    res.json({
      msg: "Fetched all tasks successfully",
      data: allTasks,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getTasksInList = async (req, res) => {
  try {
    const allTasks = await taskModel.find({
      listId: req.query.listId,
      author: req.query.authorId,
    });
    res.json({
      msg: "Fetched all tasks successfully",
      data: allTasks,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};
// not efficient yet!
exports.searchTask = async (req, res) => {
  const task = req.body.title;
  if (!task) {
    res.json({
      msg: "task is required",
    });
  }
  try {
    const allTasks = await taskModel.find({ title: task });
    res.json({
      msg: "Fetched all tasks successfully",
      data: allTasks,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};
// updating
exports.createTask = async (req, res) => {
  const listId = req.query.listId;
  const title = req.body.title;
  const author = req.body.author;
  if (!listId || !title || !author) {
    res.json({
      msg: "listid & title & author is required",
    });
  }
  try {
    const newTask = new taskModel({
      title,
      listId,
      author,
    });
    const savedTask = await newTask.save();
    const list = await listModel.findById({ _id: listId });
    if (!list) {
      res.status(404).json({ msg: "Sorry, we couldnt find this list" });
    }
    await list.createdTasks.push(savedTask);
    await list.save();
    res.json({
      msg: "List added successfully",
      data: newTask,
    });
  } catch (error) {
    res.status(400).json({ error });
    console.log(error);
  }
};
//updating
exports.updateTask = async (req, res) => {
  const _listId = req.query.listId;
  const tasksId = req.query.taskId;
  if (!_listId || !tasksId) {
    res.json({
      msg: "listid & tasksid is required",
    });
  }
  try {
    const task = await taskModel.findOneAndUpdate(
      { _id: tasksId, listId: _listId },
      {
        $set: req.body,
      }
    );
    res.json({
      msg: "task updated successfully",
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.deleteTask = async (req, res) => {
  const tasksId = req.query.tasksId;
  if (!tasksId) {
    res.json({
      msg: "tasksId is required",
    });
  }
  try {
    const task = await taskModel.findById({
      _id: tasksId,
    });
    if (!task) {
      res.status(404).json({
        msg: "Sorry, we couldnt find this task",
      });
    }
    await taskModel.findOneAndDelete({ task }, () =>
      res.json({
        msg: "task deleted successfully",
      })
    );
  } catch (error) {
    res.status(400).json({ error });
  }
};
//updated
exports.completeTask = async (req, res) => {
  const taskId = req.query.taskId;
  if (!taskId) {
    res.json({
      msg: "taskId is required",
    });
  }
  try {
    const task = await taskModel.findOne({ _id: taskId });
    task.completed = !task.completed;
    await task.save();
    console.log(task);
    res.json({
      msg: "Task status changed successfully",
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};
