var express = require('express');
var log = require('../log');
var strategyActionModel  = require('./../model/strategyActionModel');
var strategyManager = require('./strategyManager');
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
  var dataString = userInput['data'];
  if(dataString){
    var dataList = JSON.parse(dataString);
    for (var i = dataList.length - 1; i >= 0; i--) {
      dataList[i]['createdBy'] = userId;
      var strategyAction = new strategyActionModel(dataList[i]);
      strategyAction.save();
      //adding action count to the strategy
      strategyManager.addActionCount(strategyAction.strategyId, false, true, userId, function(err, data) {});
    };
    callback("", {"ok":dataList.length})
  }else{
    userInput['createdBy'] = userId;
    var strategyAction = new strategyActionModel(userInput);
    strategyAction.save(callback);
  }
}

function editStrategyAction(id, userInput, userId, callback) {
  var strategyAction = strategyActionModel.findById(id, function (err, strategyActionData){

  if(strategyAction){
    if(userInput.hasOwnProperty('status')){
      if(!strategyActionData.status && userInput['status'] == true){
        userInput['completedDate'] = new Date();
        //adding completed action count to the strategy
        strategyManager.addActionCount(strategyActionData.strategyId, true, true, userId, function(err, data) {});
      }
      if(strategyActionData.status && userInput['status'] == false){
        userInput['completedDate'] = null;
        //reducing completed action count to the strategy
        strategyManager.addActionCount(strategyActionData.strategyId, true, false, userId, function(err, data) {});
      }
    }
    if(!strategyActionData.isDeleted && userInput.isDeleted){
      //reducing action count to the strategy
        strategyManager.addActionCount(strategyActionData.strategyId, false, false, userId, function(err, data) {});  
    }
    userInput['lastModified'] = new Date();
    userInput['updatedBy'] = userId;
    strategyAction.update(userInput,callback);
  }
  });  
}

function deleteStrategyAction(id, userId, callback){  
  editStrategyAction(id, {isDeleted:true}, userId, callback);   
};


