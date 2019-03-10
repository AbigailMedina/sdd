const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const router = express.Router();
const PORT = 5000;

const user = require('./routes/User');
const project = require('./routes/Project');

app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://127.0.0.1:27017/api', 
    {   useNewUrlParser: true,
        useCreateIndex: true
     });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.use('/api/projects', project);
app.use('/api/users', user);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});