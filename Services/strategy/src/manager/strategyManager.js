var express = require('express');
var log = require('../log');
var strategyModel  = require('./../model/strategyModel');
var router = express.Router();

module.exports = {
  getStrategy: getStrategy,
  createStrategy: createStrategy,
  editStrategy: editStrategy,
  deleteStrategy: deleteStrategy,
  addActionCount : addActionCount
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
    query = generateSearchQuery(query, userInput);
    strategyModel.find(query).populate('officeId', '_id ID OfficeName')
    .populate('initiativeId', '_id ID InitiativeName')
    .populate('practiceId', '_id ID PracticeName')
    .populate('regionId', '_id ID RegionName')
    .populate('team', '-password').exec(callback);
  }
}

function generateSearchQuery(query, userInput){
  if(userInput['officeid']){
    var officeArray = userInput['officeid'].split(',');
    query['officeId'] = { "$in" : officeArray };
  }
  if(userInput['practiceid']){
    var practiceArray = userInput['practiceid'].split(',');
    query['practiceId'] = { "$in" : practiceArray };
  }
  if(userInput['regionid']){
    var regionArray = userInput['regionid'].split(',');
    query['regionId'] = { "$in" : regionArray };
  }
  if(userInput['initiativeid']){
    var initiativeArray = userInput['initiativeid'].split(',');
    query['initiativeId'] = { "$in" : initiativeArray };
  }
  return query;
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

function addActionCount(id, completed, addaction, userId, callback) {
  console.log(id)
  console.log(completed)
  console.log(addaction)
  data = {};
  var strategy = strategyModel.findById(id);
  if(strategy){
    if(completed){
      if(addaction){
        data['$inc'] = { 'completedActions': 1 }; 
      }
      else{
        data['$inc'] = { 'completedActions': -1 };
      } 
    }
    else{
      data['$inc'] = { 'actions': 1 };
    }
    data['lastModified'] = new Date();
    data['updatedBy'] = userId;
    console.log(data)
    strategy.update(data, callback);
  }  
}


function deleteStrategy(id, userId, callback){  
  editStrategy(id, {isDeleted:true}, userId, callback);   
};

