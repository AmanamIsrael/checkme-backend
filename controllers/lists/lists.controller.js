const listModel = require('../../models/lists.model');

exports.getAllLists = async(req, res) => {
    try {
        const id = req.query.userId;
        const list = await listModel.find({ author: id });
        res.json({
            msg: 'Successfully gotten all lists',
            data: list
        });
    } catch (error) {
        res.status(400).json({ error });
    }
}

exports.createList = async(req, res) => {
    try {
        const title = req.body.title;
        const author = req.body.author;
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
    try {
        const listId = req.query.listId;
        const authorId = req.query.authorId;
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
    try {
        const listId = req.query.listId;
        const authorId = req.query.authorId;
        const removedList = await listModel.findByIdAndRemove({ author: authorId, _id: listId });
        res.json({
            msg: "List removed successfully",
            data: removedList
        })
    } catch (error) {
        res.status(400).json({ error });
    }
}