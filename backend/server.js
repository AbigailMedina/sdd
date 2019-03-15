const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const router = express.Router();
const PORT = process.env.PORT || 5000;
let Project = require('./model.project');

app.use(cors());
app.use(bodyParser.json());

// TODO: sign up for mongo db site (maybe AWS) and change this url to the site url

const uri = "mongodb://PEAKE:mongoDB1!@ds017175.mlab.com:17175/heroku_ht20w3xq";

// const MongoClient = require(‘mongodb’).MongoClient;
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

//const uri = "mongodb://127.0.0.1:27017/api";
mongoose.connect(process.env.MONGODB_URI || uri, { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

router.route('/').get(function(req, res) {
    Project.find(function(err, projects) {
        if (err) {
            console.log(err);
        } else {
            res.json(projects);
        }
    });
});

router.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Project.findById(id, function(err, project) {
        res.json(project);
    });
});

router.route('/add').post(function(req, res) {
    let project = new Project(req.body);
    project.save()
        .then(project => {
            res.status(200).send({'project': project});
        })
        .catch(err => {
            res.status(400).send('adding new project failed');
        });
});

router.route('/update/:id').post(function(req, res) {
    Project.findById(req.params.id, function(err, project) {
        if (!project)
            res.status(404).send('data is not found');
        else
            project.name = req.body.name;

            project.save().then(project => {
                res.json('project updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

router.route('/projects').get(function (req, res){
    var projects= [
            { title: 'Test Class 1'},
            { title: 'Test Class 2'},
            { title: 'Test Class 3'},
          ]; 
});


router.route('/:userId/projects').get(function (req, res){
    var projects;
    if(req.params.userId=="medina2"){
        projects = [
            {id: 1, title: 'SDD'},
            {id: 2, title: 'OpSys'},
            {id: 3, title: 'RCOS'},
          ];
    }else{
        projects = [
            {id: 1, title: 'comm'},
            {id: 2, title: 'psyc'},
            {id: 3, title: 'RCOS'},
          ];
    }
});

app.use('/api', router);
// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// })

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });
}

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});