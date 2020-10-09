const listModel = require('../../models/lists');

exports.getAllLists = (req, res) => {
    listModel.find({}).then((lists) => {
        res.json({
            msg: 'Successfully gotten all lists',
            data: lists
        });
    }).catch(error => {
        res.status(400).json({ err: error });
    })
}

exports.createList = (req, res) => {
    const title = req.body.title;
    const newList = new listModel({
        title
    });
    try {
        newList.save().then((list) => {
            res.json({
                msg: 'List added successfully',
                data: list
            })
        })
    } catch (error) {
        res.status(400).json({ err: error });
    }
}

exports.updateList = (req, res) => {
    const listId = req.params.id;
    listModel.findByIdAndUpdate({ _id: listId }, {
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
    if (!listId) {
        res.json({
            msg: "list id is required"
        })
    }
    listModel.findByIdAndRemove({ _id: listId }).then((removedList) => {
        res.json({
            msg: "List removed successfully",
            data: removedList
        })
    })
}