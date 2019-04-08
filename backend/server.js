const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');
const PORT = process.env.PORT || 5000;
const app = express();
const router = express.Router();
const path = require('path');

let Project = require('./model.project');
let User = require('./model.user');

// this is our MongoDB database
const uri = "mongodb://PEAKE:mongoDB1!@ds017175.mlab.com:17175/heroku_ht20w3xq";
mongoose.connect( uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})
connection.on("error", console.error.bind(console, "MongoDB connection error:"));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// enable cors
const cors = require('cors');
app.use(cors());

// {
//     'origin': '*',
//     'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     'preflightContinue': false,
//     'optionsSuccessStatus': 204}

// bodyParser, parses the request body to be a readable json format

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   next();
// });


app.get('/projects', function(req, res, next) {
   Project.find(function(err, projects) {
        if (err) {
            console.log(err);
        } else {
            res.json(projects);
        }
    });
   
});


app.get('/projects/:id', function(req, res, next) {
    let id = req.params.id;
    Project.findById(id, function(err, project) {
        res.status(200).send({'project':project});
    });
});

//used for removing a user in groupSettings
app.patch('/projects/:id', function(req, res, next) {
    let id = req.params.id;
    Project.findById(id, function(err, project) {
        project.collaborators = req.body.collaborators;
         project.save().then(project => {
            res.status(200).send({'project':project});
        })
    });
});

app.post('/add', function(req, res) {
    let project = new Project(req.body);
    project.save()
        .then(project => {
            res.status(200).send({'project': project});
        })
        .catch(err => {
            res.status(400).send('adding new project failed');
        });
});

app.post('/login', function(req, res) {
    const{userId,password} = req.body;
    User.findOne({userId}, function (err, user) {
        if(user){
            res.status(200).send({"user" : user})
        }else{
            res.status(400).send({message : "invalid login"})
        }

    });    
});

app.post('/update/:id', function(req, res) {
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

app.get('/users', function(req,res){
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

app.get('/users/:email', function(req,res){
    let email = req.params.email;
    User.findOne({email})
        .then(user =>{
            if(user){
                return res.status(200).send({"user": user});
            }else{
                return res.status(400).send("cannot find user");
            }
        });
});

app.get('/users/:id', function(req,res){
    let id = req.params.id;
    User.findOne({id})
        .then(user =>{
            if(user){
                return res.status(200).send({"user": user});
            }else{
                return res.status(400).send("cannot find user");
            }
        });
});

app.patch('/users/:email', function(req,res){
    let email = req.params.email;
    User.findOne({email})
        .then(user =>{
            if(user){
                user.projects = req.body.projects;
                user.save().then(user => {
                    res.status(200).send({'user':user});
                })
            }else{
                return res.status(400).send("cannot find user");
            }
        });
});


//@route    POST api/users
//@desc     Register new user
//@access   Public 
app.post('/users', function(req, res){
    const{name,userId,email,password, projects} = req.body;
    //Validation
    if(!name || !userId || !email || !password){
        return res.status(400).json({msg: 'Please enter all fields'});
    }

    User.findOne({email})
        .then(user =>{
            if(user){
                return res.status(400).json({msg: 'Email already exits'});
            }else{
                const newUser = new User({
                    name,
                    userId,
                    email,
                    password,
                    projects
                });
                
                //Don't want to store actual password in db, so hash
                //Create salt & hash
                bcrypt.genSalt(10, function(err, salt){
                    bcrypt.hash(newUser.password, salt, function(err, hash){
                        if(err){
                            throw err;
                        }newUser.password = hash;
                        newUser.save()
                            .then(function(user){
                                res.json({
                                    user:{
                                       name: user.name,
                                       userId: user.userId,
                                       email: user.email,
                                       id: user.id,
                                       projects: user.projects
                                    }
                                })
                            })
                    })
                })
            }
        })
});

// app.use("/api", router);
// launch our backend into a port
app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));