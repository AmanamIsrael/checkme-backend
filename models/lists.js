const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 1,
        trim: true
    }
})

module.exports = mongoose.model('list', listSchema);