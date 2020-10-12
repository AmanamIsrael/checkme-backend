const listModel = require('../../models/lists.model');

exports.getAllLists = async(req, res) => {
    const userId = req.query.userId;
    if (!userId) {
        res.status(400).json({
            msg: "userid is required"
        })
    }
    try {
        const list = await listModel.find({ author: userId });
        res.json({
            msg: 'Successfully gotten all lists',
            data: list
        });
    } catch (error) {
        res.status(400).json({ error });
    }
}

exports.createList = async(req, res) => {
    const title = req.body.title;
    const author = req.body.author;
    if (!title || !author) {
        res.json({
            msg: "title & author is required"
        })
    }
    try {
        const newList = new listModel({
            title,
            author
        });
        await newList.save();
        res.json({
            msg: 'List added successfully',
            data: newList
        })
    } catch (error) {
        res.status(400).json({ error });
    }
}

exports.updateList = async(req, res) => {
    const listId = req.query.listId;
    const authorId = req.query.authorId;
    if (!listId || !authorId) {
        res.json({
            msg: "listid && authorid is required"
        })
    }
    try {
        await listModel.findByIdAndUpdate({ author: authorId, _id: listId }, {
            $set: req.body
        })
        res.json({
            msg: 'List updated successfully'
        })
    } catch (error) {
        res.status(400).json({ error });
    }
}

exports.deleteList = async(req, res) => {
    const listId = req.query.listId;
    const authorId = req.query.authorId;
    if (!listId || !authorId) {
        res.json({
            msg: "listid && authorid is required"
        })
    }
    try {
        const removedList = await listModel.findByIdAndRemove({ author: authorId, _id: listId });
        res.json({
            msg: "List removed successfully",
            data: removedList
        })
    } catch (error) {
        res.status(400).json({ error });
    }
}