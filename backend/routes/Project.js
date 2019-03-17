const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const router = express.Router();
const PORT = 5000;

let Project = require('../model.project');


router.get('/', function(req, res) {
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

module.exports = router;