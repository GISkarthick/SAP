var express = require('express');
var log = require('../log');
var initiativeModel  = require('./../model/initiativeModel');
var env_const = require('../../config/const.json');
var router = express.Router();
var PAGE = env_const.pagination.PAGE;
var LIMIT = env_const.pagination.LIMIT;

module.exports = {
  getInitiative: getInitiative,
  createInitiative : createInitiative,
  editInitiative : editInitiative,
  deleteInitiative : deleteInitiative
};

function getInitiative(userInput, callback) {
  var id = userInput['id'];
  var name = userInput['name'];
  var currentPage = PAGE;
  if(id) {
    initiativeModel.findById(id).exec(callback);
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
              {ID: new RegExp('^.*?'+name+'.*?$', "i")},
              {InitiativeName: new RegExp('^.*?'+name+'.*?$', "i")},                                
              {InitiatveSortOrder: new RegExp('^.*?'+name+'.*?$', "i")},
              {InitiativeShortName: new RegExp('^.*?'+name+'.*?$', "i")}                               
              ]
          }]     
      }; 
    }
    if(userInput.hasOwnProperty('page') && parseInt(userInput['page']) > 0){
      initiativeModel.find(query).skip(currentPage).limit(LIMIT).exec(function(err, data) {
        initiativeModel.count(query).exec(function(counterr, count) {
          var totalpage = Math.ceil(count/LIMIT);
          var obj = {"pages" : totalpage, "data" : data};
          callback(err,obj);
        });
      });
    }
    else{
      initiativeModel.find(query).exec(callback);
    }
  }
}

function createInitiative(userInput, userId, callback) {
  userInput['createdBy'] = userId;
	var initiative = new initiativeModel(userInput);
    initiative.save(callback);
}

function editInitiative(id, userInput, userId, callback) {
  var initiative = initiativeModel.findById(id);
  if(initiative){
    userInput['lastModified'] = new Date();
    userInput['updatedBy'] = userId;
    initiative.update(userInput,callback);
  }  
}

function deleteInitiative(id, userId, callback){  
  editInitiative(id, {isDeleted:true}, userId, callback);   
};
