var express = require('express');
var log = require('../log');
var strategyModel  = require('./../model/strategyModel');
var router = express.Router();

module.exports = {
  getStrategy: getStrategy,
  createStrategy: createStrategy,
  editStrategy: editStrategy,
  deleteStrategy: deleteStrategy,
  addActionCount : addActionCount,
  searchStrategy : searchStrategy
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
    strategyModel.find(query).sort({lastModified: -1}).populate('officeId', '_id ID OfficeName')
    .populate('initiativeId', '_id ID InitiativeName')
    .populate('practiceId', '_id ID PracticeName')
    .populate('regionId', '_id ID RegionName')
    .populate('team', '-password').exec(callback);
  }
}

function searchStrategy(userInput, userId, callback){
  var query = {isDeleted: false};
  
  if(userInput['myStrategy'] && userInput['myStrategy'] == true){
    query['$or'] = [{ owner : userId }]
  }
  else{
    query['$or'] = [{ owner : userId }, {team : userId}] 
  }

  query = generateSearchQuery(query, userInput);

  strategyModel.find(query).sort({lastModified: -1}).populate('officeId', '_id ID OfficeName')
  .populate('initiativeId', '_id ID InitiativeName')
  .populate('practiceId', '_id ID PracticeName')
  .populate('regionId', '_id ID RegionName')
  .populate('team', '-password').exec(callback);  
}

function generateSearchQuery(query, userInput){
  if(userInput['officeId']){
    var officeArray = userInput['officeId'].split(',');
    query['officeId'] = { "$in" : officeArray };
  }
  if(userInput['practiceId']){
    var practiceArray = userInput['practiceId'].split(',');
    query['practiceId'] = { "$in" : practiceArray };
  }
  if(userInput['regionId']){
    var regionArray = userInput['regionId'].split(',');
    query['regionId'] = { "$in" : regionArray };
  }
  if(userInput['initiativeId']){
    var initiativeArray = userInput['initiativeId'].split(',');
    query['initiativeId'] = { "$in" : initiativeArray };
  }
  if(userInput['priorityId']){
    var priorityArray = userInput['priorityId'].split(',');
    query['priorityId'] = { "$in" : priorityArray };
  }
  if(userInput['status']){
    query['status'] = userInput['status'];
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
      if(addaction){
        data['$inc'] = { 'actions': 1 }; 
      }
      else{
        data['$inc'] = { 'actions': -1 };
      }
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

