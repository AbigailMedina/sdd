const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema holding information related to one user
let User = new Schema({
    name: {
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

    projects: {         // list of Project type objects related to current user
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('User', User)