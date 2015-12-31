var express = require('express');
var log = require('../log');
var strategyModel  = require('./../model/strategyModel');
var router = express.Router();

module.exports = {
  getStrategy: getStrategy,
  createStrategy: createStrategy,
  editStrategy: editStrategy,
  deleteStrategy: deleteStrategy
};


function getStrategy(userInput, callback) {
  var id = userInput['id'];
  if(id) {
    strategyModel.findById(id).populate('officeId').populate('practiceId')
    .populate('regionId').populate('initiativeId').populate('team', '-password').exec(callback);
  }  
  else {
    strategyModel.find({isDeleted: false}).populate('officeId').populate('practiceId')
    .populate('regionId').populate('initiativeId').populate('team', '-password').exec(callback);
  }
}


function createStrategy(userInput, callback) {
	var strategy = new strategyModel(userInput);
    strategy.save(callback);
}


function editStrategy(id, userInput, callback) {
  var strategy = strategyModel.findById(id);
  if(strategy){
    userInput['lastModified'] = new Date();
    strategy.update(userInput,callback);
  }  
}


function deleteStrategy(id, callback){  
  editStrategy(id, {isDeleted:true}, callback);   
};

