var express = require('express');
var log = require('../log');
var strategyModel  = require('./../model/strategyModel');
var env_const = require('../../config/const.json');
var router = express.Router();
var PAGE = env_const.pagination.PAGE;
var LIMIT = env_const.pagination.LIMIT;

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
  var currentPage = PAGE;
  var query = {isDeleted: false};
  if(userInput.hasOwnProperty('page') && parseInt(userInput['page']) > 0){
    currentPage = (parseInt(userInput['page'])-1) * LIMIT;
  }

  if(id) {
    strategyModel.findById(id).populate('officeId', '_id ID OfficeName')
    .populate('initiativeId', '_id ID InitiativeName')
    .populate('practiceId', '_id ID PracticeName')
    .populate('regionId', '_id ID RegionName')
    .populate('team', '-password').exec(callback);
  }  
  else {
    query['$or'] = [{ owner : userId }, {team : userId}]
    strategyModel.find(query).skip(currentPage).limit(LIMIT).populate('officeId', '_id ID OfficeName')
    .populate('initiativeId', '_id ID InitiativeName')
    .populate('practiceId', '_id ID PracticeName')
    .populate('regionId', '_id ID RegionName')
    .populate('team', '-password').exec(function(err, data) {
      strategyModel.count(query).exec(function(counterr, count) {
        var totalpage = Math.ceil(count/LIMIT);
        var obj = {"pages" : totalpage, "data" : data};
        callback(err,obj);
      });
    });
  }
}

function searchStrategy(userInput, userId, callback){
  var currentPage = PAGE;
  var query = {isDeleted: false};
  if(userInput.hasOwnProperty('page') && parseInt(userInput['page']) > 0){
    currentPage = (parseInt(userInput['page'])-1) * LIMIT;
  }
  
  query['$or'] = [{ owner : userId }, {team : userId}]
  query = generateSearchQuery(query, userInput);
  strategyModel.find(query).skip(currentPage).limit(LIMIT).populate('officeId', '_id ID OfficeName')
  .populate('initiativeId', '_id ID InitiativeName')
  .populate('practiceId', '_id ID PracticeName')
  .populate('regionId', '_id ID RegionName')
  .populate('team', '-password').exec(function(err, data) {
    strategyModel.count(query).exec(function(counterr, count) {
      var totalpage = Math.ceil(count/LIMIT);
      var obj = {"pages" : totalpage, "data" : data};
      callback(err,obj);
    });
  });  
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

