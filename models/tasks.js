const { string } = require('@hapi/joi');
const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    task: {
        type: String,
        required: true,
        min: 3
    }
})

module.exports = mongoose.model('task', taskSchema);