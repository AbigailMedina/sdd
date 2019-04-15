const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');
const PORT = process.env.PORT || 5000;
const app = express();
const router = express.Router();
const path = require('path');
const Chatkit = require('@pusher/chatkit-server');

let Project = require('./model.project');   // import models used to store information
let User = require('./model.user');
let Notes=require('./model.notes.js');


const instance_locator_id = '1ac58f9f-8dfe-4f8f-bdcf-95ea233fe7f6';
const secret_key = 'ff9ae820-8f89-4a87-820c-131d94b4fe7a:gZnsTHSgDMZ8s6tZGqEgILemkDImFRk+aSuliOCRjeU='


// reference to MongoDB database
const uri = "mongodb://PEAKE:mongoDB1!@ds017175.mlab.com:17175/heroku_ht20w3xq";
mongoose.connect( uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})
connection.on("error", console.error.bind(console, "MongoDB connection error:"));

const chatkit = new Chatkit.default({
    instanceLocator:'v1:us1:1ac58f9f-8dfe-4f8f-bdcf-95ea233fe7f6',
    key: secret_key,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// enable cors
const cors = require('cors');
app.use(cors());

// get list of projects
app.get('/projects', function(req, res, next) {
   Project.find(function(err, projects) {
        if (err) {
            console.log(err);
        } else {
            res.json(projects);
        }
    });
   
});

// get list of specific user's projects
app.get('/users/:id/projects', function(req, res, next) {
    let id = req.params.id;
    User.findById(id, function(err, user) {
        res.status(200).send({'projects':user.projects});
    }).catch((err)=>res.status(400).send(err));
    
   
});

// get a specific project
app.get('/projects/:id', function(req, res, next) {
    let id = req.params.id;
    Project.findById(id, function(err, project) {
        res.status(200).send({'project':project});
    });
});

// update a specific project
app.patch('/projects/:id', function(req, res, next) {
    let id = req.params.id;
    Project.findById(id, function(err, project) {
        // update collaborators
        if (req.body.collaborators) {
            project.collaborators = req.body.collaborators;
        }
        // update notes
        if (req.body.notes) {
            project.notes=req.body.notes;
        }
        // update project name
        if (req.body.name) {
            oldName = project.name;
            project.name=req.body.name;
            collabs = project.collaborators;
            for(email of collabs) {
                User.findOne({email}).then(user => {
                    if(user){
                        user.projects.splice(user.projects.indexOf(oldName),1);
                        user.projects.push(project);
                        user.save();
                    }
                })
            }
        }
         project.save().then(project => {
            res.status(200).send({'project':project});
        }).catch((err)=>res.send({'err':err}))
    });
});

// add a new project
app.post('/add', function(req, res) {
    let userId = req.body.user._id;
    User.findById(userId, function (err,user){
        if(user){
            let project = new Project(req.body);
            project.collaborators.push(user.email);
            project.save()
            .then(project2 => {
                user.projects.push(project)
                user.save().then(user2 =>{
                    res.status(200).send({'user':user2});
                }).catch(err =>{
                    res.status(400).send('updating user failed');
                })
                res.status(200).send(
                    {'project': project2});
            })
            .catch(err => {
                res.status(400).send('adding new project failed');
            });
        }else{
            res.status(400).send({'user could not be found:':req.body.user})
        }
    })

    
    
});

// login as a user
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

// update a project
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

// get a list of all users
app.get('/users', function(req,res){
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

/*
app.get('/users/:email', function(req,res){
    let email = req.params.email;
    User.findOne({email})
        .then(user =>{
            if(user){
                return res.status(200).send({"user": user});
            }else{
                return res.status(400).send(err);
            }
        });
});
*/

// get a specific user by email
app.get('/users/get/:email', function(req,res){
    let email = req.params.email;
    User.findOne({email})
        .then(user =>{
            if(user){
                return res.status(200).send({"user": user});
            }else{
                return res.status(400).send(err);
            }
        }).catch((err)=>res.send({'err':err}))    
});

// get a specific user by id
app.get('/users/:id', function(req,res){
    let id = req.params.id;
    User.findById(id, function(err, user) {
        res.status(200).send({'user':user});
    }).catch((err)=>res.status(400).send(err));
});

// update a specific user by email
app.patch('/users/:email', function(req,res){
    let email = req.params.email;
    User.findOne({email})
        .then(user =>{
            if(user){
                // update email address
                if(req.body.email){
                    //oldEmail = user.email;
                    user.email = req.body.email;
                    user.save().then(user => {
                        res.status(200).send({'user':user});
                    }).catch((err)=>res.send({'err':err})) 
                    /*
                    for(project of user.projects) {
                        name = project.name;
                        user.projects.splice(user.projects.indexOf(project),1);
                        Project.findOne({name}).then(proj => {                      
                            if(proj) {
                                proj.collaborators.splice(proj.collaborators.indexOf(oldEmail),1);
                                proj.collaborators.push(user.email);
                                console.log(proj);
                                proj.save();
                                user.projects.push(proj);
                            }
                        })   
                    }
                    */
                }
                // update password
                if(req.body.password){
                    bcrypt.genSalt(10, function(err, salt){
                        bcrypt.hash(req.body.password, salt, function(err, hash){
                            if(err){
                                throw err;
                            }
                            user.password = hash;
                            user.save().then(user => {
                                res.status(200).send({'user':user});
                            }).catch((err)=>res.send({'err':err}))    
                        })
                    })
                }
                // update user's list of projects
                if(req.body.projects){
                    user.projects = req.body.projects;
                    user.save().then(user => {
                        res.status(200).send({'user':user});
                    }).catch((err)=>res.send({'err':err}))    
                }
            }else{
                return res.status(400).send("cannot find user");
            }
        }).catch((err)=>res.send({'err':err}))    
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
                
                // Create user for Chatkit
                chatkit
                    .createUser({
                        id: userId,
                        name: name,
                    })
                    .then(()=>{
                        res.sendStatus(201);
                    })
                    .catch((error) =>{
                        console.log(error);
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
                            }).catch((err)=>res.send({'err':err}))    
                    })
                })
            }
        }).catch((err)=>res.send({'err':err}))    
});

// Save notes
app.post('/addNotes', function(req, res) {
    let notes = new Notes(req.body);
    notes.save()
        .then(notes => {
            res.status(200).send({'notes': notes});
        })
        .catch(err => {
            res.status(400).send('adding new notes failed');
        });
});

// app.use("/api", router);

// launch our backend into a port
app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));