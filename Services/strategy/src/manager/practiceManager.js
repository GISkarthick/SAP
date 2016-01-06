var express = require('express');
var log = require('../log');
var practiceModel  = require('./../model/practiceModel');
var router = express.Router();

module.exports = {
  getPractice: getPractice,
  createPractice : createPractice,
  editPractice : editPractice,
  deletePractice : deletePractice
};


function getPractice(userInput, callback) {
  var id = userInput['id'];
  if(id) {
    practiceModel.findById(id).exec(callback);
  }  
  else {
    practiceModel.find({}).exec(callback);
  }
}

function createPractice(userInput, userId, callback) {
  userInput['createdBy'] = userId;
	var practice = new practiceModel(userInput);
    practice.save(callback);
}


function editPractice(id, userInput, userId, callback) {
  var practice = practiceModel.findById(id);
  if(practice){
    userInput['lastModified'] = new Date();
    userInput['updatedBy'] = userId;
    practice.update(userInput,callback);
  }  
}


function deletePractice(id, userId, callback){  
  editPractice(id, {isDeleted:true}, userId, callback);   
};
