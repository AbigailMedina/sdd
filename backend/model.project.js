const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Project = new Schema({
    name: {
        type: String
    },
    collaborators: {
    	type: Array
    },

    notes: {
    	type: Array
    }
});

module.exports = mongoose.model('Project', Project);