const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 1,
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'author',
        required: true
    },
    createdTasks: [{
        type: mongoose.Schema.Types.Mixed,
        ref: 'createdtask',
    }],
}, { timestamps: true });

module.exports = mongoose.model('list', listSchema);