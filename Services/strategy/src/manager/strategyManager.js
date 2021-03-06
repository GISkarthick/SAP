var express = require('express');
var log = require('../log');
var strategyModel  = require('./../model/strategyModel');
var LookupsModel  = require('./../model/lookupModel');
var env_config = require('../../config/config');
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
  searchStrategy : searchStrategy,
  getStrategyPagination : getStrategyPagination,
  getLookups: getLookups
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

function getStrategyPagination(userInput, userId, callback) {
  var id = userInput['id'];
  var sortBy = userInput['sortby'];
  var asc = userInput['asc'];
  var currentPage = PAGE;
  var query = {isDeleted: false};
  if(id) {
    strategyModel.findById(id).populate('officeId', '_id ID OfficeName')
    .populate('initiativeId', '_id ID InitiativeName')
    .populate('practiceId', '_id ID PracticeName')
    .populate('regionId', '_id ID RegionName')
    .populate('team', '-password').populate('owner', '-password').exec(callback);
  }  
  else {
    if(userInput.hasOwnProperty('page') && parseInt(userInput['page']) > 0){
      if(userInput.hasOwnProperty('limit') && parseInt(userInput['limit']) > 0){
        LIMIT = parseInt(userInput['limit']);
      }
      currentPage = (parseInt(userInput['page'])-1) * LIMIT;
    }
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
    if(userInput.hasOwnProperty('page') && parseInt(userInput['page']) > 0){
      strategyModel.find(query).sort(sortQuery).skip(currentPage).limit(LIMIT).populate('officeId', '_id ID OfficeName')
    .populate('initiativeId', '_id ID InitiativeName')
    .populate('practiceId', '_id ID PracticeName')
    .populate('regionId', '_id ID RegionName')
    .populate('team', '-password').populate('owner', '-password').exec(function(err, data) {
        strategyModel.count(query).exec(function(counterr, count) {
          var totalpage = Math.ceil(count/LIMIT);
          var obj = {"pages" : totalpage, "data" : data};
          callback(err,obj);
        });
      });
    }
    else{
      strategyModel.find(query).sort(sortQuery).populate('officeId', '_id ID OfficeName')
    .populate('initiativeId', '_id ID InitiativeName')
    .populate('practiceId', '_id ID PracticeName')
    .populate('regionId', '_id ID RegionName')
    .populate('team', '-password').populate('owner', '-password').exec(callback);
    }
    
  }
}

function searchStrategy(userInput, userId, callback){
  var currentPage = PAGE;
  if(userInput.hasOwnProperty('page') && parseInt(userInput['page']) > 0){
    if(userInput.hasOwnProperty('limit') && parseInt(userInput['limit']) > 0){
      LIMIT = parseInt(userInput['limit']);
    }
    currentPage = (parseInt(userInput['page'])-1) * LIMIT;
  }
  var query = {isDeleted: false};
  
  if(userInput && userInput['myStrategy'] && userInput['myStrategy'] == true){
    query['$or'] = [{ owner : userId }, {team : userId}]
  }
  else{
    //query['$or'] = [{ owner : userId }, {team : userId}] 
  }
  if(userInput){  
    query = generateSearchQuery(query, userInput);
  }
  
  console.log(query)
  if(userInput.hasOwnProperty('page') && parseInt(userInput['page']) > 0){
    strategyModel.find(query).sort({lastModified: -1}).skip(currentPage).limit(LIMIT).populate('officeId', '_id ID OfficeName')
  .populate('initiativeId', '_id ID InitiativeName')
  .populate('practiceId', '_id ID PracticeName')
  .populate('regionId', '_id ID RegionName')
  .populate('team', '-password').populate('owner', '-password').exec(function(err, data) {
      strategyModel.count(query).exec(function(counterr, count) {
        var totalpage = Math.ceil(count/LIMIT);
        var obj = {"pages" : totalpage, "data" : data};
        callback(err,obj);
      });
    });
  }
  else{
    strategyModel.find(query).sort({lastModified: -1}).populate('officeId', '_id ID OfficeName')
  .populate('initiativeId', '_id ID InitiativeName')
  .populate('practiceId', '_id ID PracticeName')
  .populate('regionId', '_id ID RegionName')
  .populate('team', '-password').populate('owner', '-password').exec(callback);
  }  
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
    //var priorityArray = userInput['priorityId'].split(',');userInput['priorityId'];
    query['priorityId'] = env_config.priorityIdValues[userInput.priorityId.toLowerCase()];
  }
  if(userInput['status']){
    var range = userInput['status'].split('-');
    if(range.length > 1)
      query['status'] = { "$gte": range[0], "$lte": range[1] };
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
    if (userInput['priorityId']) {
         userInput['priorityId'] = env_config.priorityIdValues[userInput.priorityId.toLowerCase()];
    }
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

function getLookups(userId, callback) {
    LookupsModel.findOne({}, function(err, data) {
    // LookupsModel.find({}, function(err, data) {
        console.log(err, data);
        callback(err, data);
    });
};

function deleteStrategy(id, userId, callback){  
  editStrategy(id, {isDeleted:true}, userId, callback);   
};

