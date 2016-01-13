var express = require('express');
var log = require('../log');
var officeModel  = require('./../model/officeModel');
var router = express.Router();

module.exports = {
  getOffice: getOffice,
  createOffice : createOffice,
  editOffice : editOffice,
  deleteOffice : deleteOffice
};


function getOffice(userInput, callback) {
  var id = userInput['id'];
  if(id) {
    officeModel.findById(id).exec(callback);
  }  
  else {
    officeModel.find({isDeleted: false}).exec(callback);
  }
}

function createOffice(userInput, userId, callback) {
  userInput['createdBy'] = userId;
	var office = new officeModel(userInput);
    office.save(callback);
}


function editOffice(id, userInput, userId, callback) {
  var office = officeModel.findById(id);
  if(office){
    userInput['lastModified'] = new Date();
    userInput['updatedBy'] = userId;
    office.update(userInput,callback);
  }  
}


function deleteOffice(id, userId, callback){  
  editOffice(id, {isDeleted:true}, userId, callback);   
};
