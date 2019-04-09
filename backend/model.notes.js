const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Notes = new Schema({
    date: {
        type: String,
        required: true
    },

    userId:{
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true,
        unique: true
    },
    
    password: {
        type: String,
        required: true
    },

    projects: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('User', User)