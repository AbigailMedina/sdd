const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema for notes object
let Notes = new Schema({
    date: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Notes', Notes)