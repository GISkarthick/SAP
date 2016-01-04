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


function getStrategy(userInput, userId, callback) {
  var id = userInput['id'];
  var query = {isDeleted: false};
  if(id) {
    strategyModel.findById(id).populate('officeId', '_id ID OfficeName')
    .populate('initiativeId', '_id ID InitiativeName')
    .populate('practiceId', '_id ID PracticeName')
    .populate('regionId', '_id ID RegionName')
    .populate('team', '-password').exec(callback);
  }  
  else {
    query['$or'] = [{ owner : userId }, {team : userId}]
    strategyModel.find(query).populate('officeId', '_id ID OfficeName')
    .populate('initiativeId', '_id ID InitiativeName')
    .populate('practiceId', '_id ID PracticeName')
    .populate('regionId', '_id ID RegionName')
    .populate('team', '-password').exec(callback);
  }
}


function createStrategy(userInput, userId, callback) {
  userInput['createdBy'] = userId;
	var strategy = new strategyModel(userInput);
    strategy.save(callback);
}


function editStrategy(id, userInput, userId, callback) {
  var strategy = strategyModel.findById(id);
  if(strategy){
    userInput['lastModified'] = new Date();
    userInput['updatedBy'] = userId;
    strategy.update(userInput,callback);
  }  
}


function deleteStrategy(id, userId, callback){  
  editStrategy(id, {isDeleted:true}, userId, callback);   
};

