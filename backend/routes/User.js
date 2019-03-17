const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const PORT = 5000;

let User = require('../model.user');


//@route    POST api/users
//@desc     Register new user
//@access   Public 
router.route('/').post(function(req, res){
    const{name,userId,email,password} = req.body;
    
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
                    password
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
                                       id: user.id
                                    }
                                })
                            })
                    })
                })
            }
        })
})

module.exports = router;