const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema holding information related to one project
let Project = new Schema({
    name: {
        type: String
    },
    collaborators: {
    	type: Array
    }
});

module.exports = mongoose.model('Project', Project);