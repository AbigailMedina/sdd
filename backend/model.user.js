const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    }
})

module.exports = mongoose.model('User', User)