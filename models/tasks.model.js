const { ref } = require('@hapi/joi');
const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 3
    },
    listId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'listId'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'author',
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('task', taskSchema);