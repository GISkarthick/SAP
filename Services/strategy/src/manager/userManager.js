var express = require('express');
var log = require('../log');
var userModel  = require('./../model/userModel');
var router = express.Router();

module.exports = {
  getProfile: getProfile,
  editProfile : editProfile,

};


function getProfile(userInput, callback) {
  var id = userInput['id'];
  var name = userInput['name'];
  if(id) {
    userModel.findById(id).select('-password').exec(callback);
  }  
  else {
    if(name){
      userModel.find({   
      $and:[{isDeleted: false},
          {$or:[
              {FirstName: new RegExp('^.*?'+name+'.*?$', "i")},                                
              {LastName: new RegExp('^.*?'+name+'.*?$', "i")}                                
              ]
          }]     
      }).select('-password').exec(callback); 
    }
    else{
      var query = {isDeleted: false};
      userModel.find(query).select('-password').exec(callback);
    }
    
  }
}

function createProfile(userInput, userId, callback) {
  userInput['createdBy'] = userId;
  var user = new userModel(userInput);
    user.save(callback);
}

function editProfile(id, userInput, callback) {
  var user = userModel.findById(id);
  if(user){
    if(userInput.userId){
      callback("userId cannot be change");
    }
    else{
      user.update(userInput,callback);
    }
  }  
}

function deleteProfile(id, userId, callback){  
  editProfile(id, {isDeleted:true}, userId, callback);   
};