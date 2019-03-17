const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const app = express();
const router = express.Router();
const PORT = 5000;
const user = require('./routes/User');
const project = require('./routes/Project');
const path = require('path');

// this is our MongoDB database
const uri = "mongodb://PEAKE:mongoDB1!@ds017175.mlab.com:17175/heroku_ht20w3xq";
mongoose.connect( uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})
connection.on("error", console.error.bind(console, "MongoDB connection error:"));

// enable cors
const cors = require('cors');
app.use(cors({
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false,
    'optionsSuccessStatus': 204}));

// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use('/api/projects', project);
app.use('/api/users', user);
// launch our backend into a port
app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));