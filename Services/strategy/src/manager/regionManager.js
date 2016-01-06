var express = require('express');
var log = require('../log');
var regionModel  = require('./../model/regionModel');
var router = express.Router();

module.exports = {
  getRegion: getRegion,
  createRegion : createRegion,
  editRegion : editRegion,
  deleteRegion : deleteRegion
};


function getRegion(userInput, callback) {
  var id = userInput['id'];
  if(id) {
    regionModel.findById(id).exec(callback);
  }  
  else {
    regionModel.find({}).exec(callback);
  }
}

function createRegion(userInput, userId, callback) {
  userInput['createdBy'] = userId;
	var region = new regionModel(userInput);
    region.save(callback);
}


function editRegion(id, userInput, userId, callback) {
  var region = regionModel.findById(id);
  if(region){
    userInput['lastModified'] = new Date();
    userInput['updatedBy'] = userId;
    region.update(userInput,callback);
  }  
}


function deleteRegion(id, userId, callback){  
  editRegion(id, {isDeleted:true}, userId, callback);   
};
