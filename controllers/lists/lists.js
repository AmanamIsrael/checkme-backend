const listModel = require('../../models/lists');

exports.getAllLists = (req, res) => {
    const id = req.params.userId;
    listModel.find({ author: id }).then((list) => {
        res.json({
            msg: 'Successfully gotten all lists',
            data: list
        });
    }).catch(error => {
        res.status(400).json({ err: error });
    })
}

exports.createList = async(req, res) => {
    const title = req.body.title;
    const author = req.body.author;
    const newList = new listModel({
        title,
        author
    });
    newList.save().then((list) => {
        res.json({
            msg: 'List added successfully',
            data: list
        })
    }).catch(error => {
        res.status(400).json({ err: error });
    });
}

exports.updateList = (req, res) => {
    const listId = req.params.id;
    const authorId = req.params.authorId;
    listModel.findByIdAndUpdate({ author: authorId, _id: listId }, {
        $set: req.body
    }).then(() => {
        res.json({
            msg: 'List updated successfully'
        })
    }).catch(error => {
        res.status(400).json({ err: error });
    })
}

exports.deleteList = (req, res) => {
    const listId = req.params.id;
    const authorId = req.params.authorId;
    if (!listId || !authorId) {
        res.json({
            msg: "list id is required"
        })
    }
    listModel.findByIdAndRemove({ author: authorId, _id: listId }).then((removedList) => {
        res.json({
            msg: "List removed successfully",
            data: removedList
        })
    })
}