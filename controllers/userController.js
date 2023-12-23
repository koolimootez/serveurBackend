//import User from "../models/user.js";

/*export function signin(req, res) {
  User.findOne({ email: req.body.email, password: req.body.password })
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function signup(req, res) {
  User.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    adresse: req.body.adresse,
    role: req.body.role,
      workHours: req.body.workHours,
      image: req.body.image
  })
    .then((newUser) => {
      res.status(200).json({
        username: newUser.username,
        password: newUser.password,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        adresse: newUser.adresse,
        role: newUser.role,
        workHours: newUser.workHours,
        image: newUser.image
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function putOnce(req, res) {
  let newUser = {};
  if(req.file == undefined) {
    newUser = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      adresse: req.body.adresse,
      role: req.body.role,
      workHours: req.body.workHours,
      image: req.body.image
    }
  }
  else {
    newUser = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      adresse: req.body.adresse,
      role: req.body.role,
      workHours: req.body.workHours,
      image: req.body.image
    }
  }
  User.findByIdAndUpdate(req.params.id, newUser)
    .then((doc1) => {
      User.findById(req.params.id)
        .then((doc2) => {
          res.status(200).json(doc2);
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}





// Importez votre modèle User ici

export function getAllUsers(req, res) {
  User.find({})
    .then((users) => {
      let userList = users.map((user) => ({
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        adresse: user.adresse,
        role: req.body.role,
      workHours: req.body.workHours,
      image: req.body.image
      }));
      res.status(200).json(userList);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}*/

import { validationResult } from 'express-validator';
import User from '../models/user.js';
import { request } from 'express';

export function getAllUsers(req, res) {
  User.find({})
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function addUser(req, res) {
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json({ errors: validationResult(req).array() });
  }

  User.create(req.body)
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function getUserById(req, res) { // by username and password 
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

//login connect 
export function login(req , res){
  User.findOne({email : {$eq : req.body.email} , password : {$eq : req.body.password}})
  .then((user) =>{
    if(!user){
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  })
  .catch((err) => {
    res.status(500).json({ error: err });
  });
}
//end login 


//search
  export function search(req , res){
    User.findOne({email : {$eq : req.body.email}})
    .then((user) => {
      if (!user){
        return res.status(404).json({message : 'user not found'});
      }
      res.status(200).json(user);
    })
    .catch((err) =>{
      res.status(500).json({error : err});
    });
}
//end search

 //resetpassword

  export function resetPassword(req , res){
    User.findOneAndUpdate({email : {$eq : req.body.email}} , {password : req.body.password})
    .then((user) =>{
      if (!user){
        return res.status(404).json({message : 'user not found'});
      }
      
      res.status(200).json(user);
    })
    .catch((err) =>{
      res.status(500).json({error : err});
    });
  }

 //endreset password
export function updateUser(req, res) {
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json({ errors: validationResult(req).array() });
  }

  const updatedUser = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    adresse: req.body.adresse,
    role: req.body.role,
  };

  User.findByIdAndUpdate(req.params.id, updatedUser, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}





export function deleteUser(req, res) {
  User.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

