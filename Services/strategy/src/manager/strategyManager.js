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
  var sortBy = userInput['sortby'];
  var asc = userInput['asc'];
  var query = {isDeleted: false};
  if(id) {
    strategyModel.findById(id).populate('officeId', '_id ID OfficeName')
    .populate('initiativeId', '_id ID InitiativeName')
    .populate('practiceId', '_id ID PracticeName')
    .populate('regionId', '_id ID RegionName')
    .populate('team', '-password').populate('owner', '-password').exec(callback);
  }  
  else {
    //query['$or'] = [{ owner : userId }, {team : userId}]
    var sortQuery = {lastModified: -1};
    var sortType = -1;  
    if(sortBy){
      console.log(sortBy)
      if(asc == 1){
        sortType = 1;
      }
      console.log(sortType)
      if(sortBy == "strategyName"){
        sortQuery = {strategyName: sortType};
      }
      else if(sortBy == "status"){
        sortQuery = {status: sortType};
      }
      else if(sortBy == "priorityId"){
        sortQuery = {priorityId: sortType};
      }
    }
    console.log(sortQuery)
    strategyModel.find(query).sort(sortQuery).populate('officeId', '_id ID OfficeName')
    .populate('initiativeId', '_id ID InitiativeName')
    .populate('practiceId', '_id ID PracticeName')
    .populate('regionId', '_id ID RegionName')
    .populate('team', '-password').populate('owner', '-password').exec(callback);
  }
}

function searchStrategy(userInput, userId, callback){
  var query = {isDeleted: false};
  
  if(userInput && userInput['myStrategy'] && userInput['myStrategy'] == true){
    query['$or'] = [{ owner : userId }]
  }
  else{
    //query['$or'] = [{ owner : userId }, {team : userId}] 
  }
  if(userInput){  
    query = generateSearchQuery(query, userInput);
  }
  
console.log(query)
  strategyModel.find(query).sort({lastModified: -1}).populate('officeId', '_id ID OfficeName')
  .populate('initiativeId', '_id ID InitiativeName')
  .populate('practiceId', '_id ID PracticeName')
  .populate('regionId', '_id ID RegionName')
  .populate('team', '-password').exec(callback);  
}

function generateSearchQuery(query, userInput){
  if(userInput['officeId']){
    //var officeArray = userInput['officeId'].split(',');
    query['officeId'] = { "$in" : userInput['officeId'] };
  }
  if(userInput['practiceId']){
    //var practiceArray = userInput['practiceId'].split(',');
    query['practiceId'] = { "$in" : userInput['practiceId'] };
  }
  if(userInput['regionId']){
    //var regionArray = userInput['regionId'].split(',');
    query['regionId'] = { "$in" : userInput['regionId'] };
  }
  if(userInput['initiativeId']){
    //var initiativeArray = userInput['initiativeId'].split(',');
    query['initiativeId'] = { "$in" : userInput['initiativeId'] };
  }
  if(userInput['priorityId']){
    //var priorityArray = userInput['priorityId'].split(',');
    query['priorityId'] = userInput['priorityId'];
  }
  if(userInput['status']){
    var range = userInput['status'].split('-');
    if(range.length > 1)
      query['status'] = { "$gte": range[0], "$lt": range[1] };
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

