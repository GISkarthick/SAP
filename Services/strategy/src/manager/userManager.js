var express = require('express');
var log = require('../log');
var userModel  = require('./../model/userModel');
var env_const = require('../../config/const.json');
var router = express.Router();
var PAGE = env_const.pagination.PAGE;
var LIMIT = env_const.pagination.LIMIT;

module.exports = {
  getProfile: getProfile,
  editProfile : editProfile,

};


function getProfile(userInput, callback) {
  var id = userInput['id'];
  var name = userInput['name'];
  var currentPage = PAGE;
  if(id) {
    userModel.findById(id).select('-password').exec(callback);
  }  
  else {
    if(userInput.hasOwnProperty('page') && parseInt(userInput['page']) > 0){
      if(userInput.hasOwnProperty('limit') && parseInt(userInput['limit']) > 0){
        LIMIT = parseInt(userInput['limit']);
      }
      currentPage = (parseInt(userInput['page'])-1) * LIMIT;
    }
    var query = {isDeleted: false};
    if(name){
      query = {   
      $and:[{isDeleted: false},
          {$or:[
              {FirstName: new RegExp('^.*?'+name+'.*?$', "i")},                                
              {LastName: new RegExp('^.*?'+name+'.*?$', "i")}                                
              ]
          }]     
      }; 
    }
    if(userInput.hasOwnProperty('page') && parseInt(userInput['page']) > 0){
      userModel.find(query).skip(currentPage).limit(LIMIT).select('-password').exec(function(err, data) {
        userModel.count(query).exec(function(counterr, count) {
          var totalpage = Math.ceil(count/LIMIT);
          var obj = {"pages" : totalpage, "data" : data};
          callback(err,obj);
        });
      });
    }
    else{
      userModel.find(query).select('-password').exec(callback);
    }
    
  }
}

function createProfile(userInput, userId, callback) {
  userInput['createdBy'] = userId;
  var user = new userModel(userInput);
    user.save(callback);
}

function editProfile(id, userInput, userId, callback) {
  var user = userModel.findById(id);
  if(user){
    if(userInput.userId){
      callback("userId cannot be change");
    }
    else{
      userInput['lastModified'] = new Date();
      user.update(userInput,callback);
    }
  }  
}

function deleteProfile(id, userId, callback){  
  editProfile(id, {isDeleted:true}, userId, callback);   
};