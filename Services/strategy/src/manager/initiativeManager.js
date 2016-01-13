var express = require('express');
var log = require('../log');
var initiativeModel  = require('./../model/initiativeModel');
var router = express.Router();

module.exports = {
  getInitiative: getInitiative,
  createInitiative : createInitiative,
  editInitiative : editInitiative,
  deleteInitiative : deleteInitiative
};

function getInitiative(userInput, callback) {
  var id = userInput['id'];
  if(id) {
    initiativeModel.findById(id).exec(callback);
  }  
  else {
    initiativeModel.find({isDeleted: false}).exec(callback);
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
