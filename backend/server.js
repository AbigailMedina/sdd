const keys = require("../config.js");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');
const PORT = process.env.PORT || 5000;
const app = express();
const router = express.Router();
const path = require('path');
const Chatkit = require('@pusher/chatkit-server')

let Project = require('./model.project');   // import models used to store information
let User = require('./model.user');
let Notes=require('./model.notes.js');

// reference to MongoDB database
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

const chatkit = new Chatkit.default({
    instanceLocator : keys[1],
    key: keys[2]
})

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

// get a specific project based on project id
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
        if (req.body.collaborators) {                   // update collaborators
            var diff_collaborator = []
            if (project.collaborators.length > req.body.collaborators.length){ // Remove from chatkit group
                diff_collaborator = project.collaborators.slice(0);
                for(i =0; i < project.collaborators.length; i++){
                    for(j = 0; j< req.body.collaborators.length; j++){
                        if(project.collaborators[i] == req.body.collaborators[j]){
                            diff_collaborator.splice(i, i+1)
                            break;
                        }
                    }
                }
                User.findOne({email: diff_collaborator[0]})
                .then(user => {
                    var room_to_remove_from;
                    chatkit.getUserRooms({
                        userId: user.userId
                    }).then((res) =>{
                        for(i = 0; i < res.length;i++){
                            if(res[i].name == project.name){
                                room_to_remove_from = res[i].id
                            }
                        }
                        chatkit.removeUsersFromRoom({
                            roomId: room_to_remove_from,
                            userIds: [user.userId]
                        })
                    }).catch((error) =>{
                        console.log(error)
                    })
                }) 
            }
            else{ // Added a collaborator
                User.findOne({email: project.collaborators[0]}) // Find user to get the room Id from
                    .then(user => {
                        var room_to_add_to;
                        chatkit.getUserRooms({
                            userId: user.userId
                        }).then((res) =>{
                            for(i = 0; i < res.length;i++){
                                if(res[i].name == project.name){
                                    room_to_add_to = res[i].id
                                    break;
                                }
                            }
                            User.findOne({email: req.body.collaborators[req.body.collaborators.length -1]}) //Find user to add to the chat room
                            .then(user => {
                                chatkit.addUsersToRoom({
                                    roomId : room_to_add_to,
                                    userIds : [user.userId]
                                })
                            }).catch(error =>{
                                console.log(error)
                            })
                        }).catch((error) =>{
                            console.log(error)
                        })
                    })
            }
            
            project.collaborators = req.body.collaborators;

            var domain = 'sandbox16702acd92154321a7dd605d1c1aefb6.mailgun.org';
            var api_key = keys[0];                              // send email when user is added

            var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
            var data = {
                from: 'PEAKE <teampeakepeake@gmail.com>',
                to: req.body.collaborators[req.body.collaborators.length-1],
                subject: 'Added to project',
                text: 'Hi! You\'ve been added to the following project:'+project.name+"\nJoin your group at https://sdd-shutup.herokuapp.com/#/"
            };
            mailgun.messages().send(data, function (error, body) {
                console.log(body);
            });
        }
        if (req.body.notes) {               // update notes for this project
            project.notes=req.body.notes;
        }
        if (req.body.name) {                // update project name
            const old_name = project.name;
            chatkit.getRooms({ })// Retrieve room id from chatkit
                .then(rooms =>{
                    var room_to_change;
                    for (i = 0; i < rooms.length; i++){
                        if(rooms[i].name == old_name){
                            room_to_change = rooms[i].id
                            break;
                        }
                    }
                    chatkit.updateRoom({
                        id: room_to_change,
                        name: req.body.name
                    }).catch(error =>{
                        console.log(error)
                    })
                })
            oldName = project.name;
            project.name=req.body.name;
            collabs = project.collaborators;
            
            for(email of collabs) {
                User.findOne({email}).then(user => {        // update new project name for each user
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
    User.findById(userId, function (err,user){      // add new project to specific users
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
                chatkit
                    .createRoom({
                    creatorId: user.userId,
                    name: project.name
                }).then(() =>{
                    console.log(project.name + '\'s room created');
                }).catch((err) =>{
                    console.log(err);
                })
            })
            .catch(err => {
                res.status(400).send('adding new project failed');
            });
        }else{
            res.status(400).send({'user could not be found:':req.body.user})
        }
    })
});

// log in a user
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
        if (!project) {
            res.status(404).send('data is not found');
        } else {
            project.name = req.body.name;
            project.save().then(project => {
                res.json('project updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
        }
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
                if(req.body.email){     // update email address
                    user.email = req.body.email;
                    user.save().then(user => {
                        res.status(200).send({'user':user});
                    }).catch((err)=>res.send({'err':err})) 
                }
                if(req.body.password){              // update password
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
                if(req.body.projects){             // update user's list of projects
                    user.projects = req.body.projects;
                    user.save().then(user => {
                        res.status(200).send({'user':user});
                    }).catch((err)=>res.send({'err':err}))    
                }
            }else{
                return res.status(400).send("cannot find user");
            }
        }).catch((err)=>res.send({'err':err}))    
    }
);

// register new user
app.post('/users', function(req, res){
    const{name,userId,email,password, projects} = req.body;
    if(!name || !userId || !email || !password){        // validate user credentials
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

                chatkit
                    .createUser({
                        id: newUser.userId,
                        name: newUser.name
                    })
                    .then(() =>{
                        res.sendStatus(201);
                    })
                    .catch((error) => {
                        if (error.error === 'services/chatkit/user_already_exists') {
                            res.sendStatus(200);
                        }else {
                            let statusCode = error.status;
                            if (statusCode >= 100 && statusCode < 600) {
                                res.status(statusCode);
                            } else {
                                res.status(500);
                            }
                        }
                    })
                
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
    }
);

// save notes
app.post('/addNotes', function(req, res) {
    let notes = new Notes(req.body);
    notes.save()
        .then(notes => {
            res.status(200).send({'notes': notes});
        })
        .catch(err => {
            res.status(400).send('adding new notes failed');
        });
    }
);

// launch our backend into a port
app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));