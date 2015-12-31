var express = require('express');
var log = require('../log');
var strategyActionModel  = require('./../model/strategyActionModel');
var router = express.Router();

module.exports = {
  getStrategyAction: getStrategyAction,
  createStrategyAction: createStrategyAction,
  editStrategyAction: editStrategyAction,
  deleteStrategyAction: deleteStrategyAction
};


function getStrategyAction(userInput, callback) {
  var id = userInput['id'];
  var strategyId = userInput['strategyid'];
  if(id) {
    strategyActionModel.findById(id).populate('updatedBy', '-password').exec(callback);
  }  
  else {
    var query = {isDeleted: false};
    if(strategyId){
      query['strategyId'] = strategyId;
    }
    strategyActionModel.find(query).populate('updatedBy', '-password').exec(callback);
  }
}

function createStrategyAction(userInput, userId, callback) {
  console.log(userId)
  var dataString = userInput['data'];
  if(dataString){
    var dataList = JSON.parse(dataString);
    for (var i = dataList.length - 1; i >= 0; i--) {
      dataList[i]['createdBy'] = userId;
      var strategyAction = new strategyActionModel(dataList[i]);
      strategyAction.save();
    };
    callback("", {"ok":dataList.length})
  }else{
    userInput['createdBy'] = userId;
    var strategyAction = new strategyActionModel(userInput);
    strategyAction.save(callback);
  }
}

function editStrategyAction(id, userInput, userId, callback) {
  var strategyAction = strategyActionModel.findById(id);
  if(strategyAction){
    if(userInput['status']){
      if(userInput['status'] == true)
        userInput['completedDate'] = new Date();
      if(userInput['status'] == false)
        userInput['completedDate'] = null;
    }
    userInput['lastModified'] = new Date();
    userInput['updatedBy'] = userId;
    strategyAction.update(userInput,callback);
  }  
}

function deleteStrategyAction(id, userId, callback){  
  editStrategyAction(id, {isDeleted:true}, userId, callback);   
};
