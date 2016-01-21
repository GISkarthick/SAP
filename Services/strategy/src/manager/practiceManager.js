var express = require('express');
var log = require('../log');
var practiceModel  = require('./../model/practiceModel');
var env_const = require('../../config/const.json');
var router = express.Router();
var PAGE = env_const.pagination.PAGE;
var LIMIT = env_const.pagination.LIMIT;

module.exports = {
  getPractice: getPractice,
  createPractice : createPractice,
  editPractice : editPractice,
  deletePractice : deletePractice
};


function getPractice(userInput, callback) {
  var id = userInput['id'];
  var name = userInput['name'];
  var currentPage = PAGE;
  if(id) {
    practiceModel.findById(id).exec(callback);
  }  
  else {
    if(userInput.hasOwnProperty('page') && parseInt(userInput['page']) > 0){
      if(userInput.hasOwnProperty('limit') && parseInt(userInput['limit']) > 0){
        LIMIT = parseInt(userInput['limit']);
      }
      currentPage = (parseInt(userInput['page'])-1) * LIMIT;
    }
    var query = {isDeleted: false};
    if(name){
      query = {   
      $and:[{isDeleted: false},
          {$or:[
              {ID: new RegExp('^.*?'+name+'.*?$', "i")},
              {PracticeName: new RegExp('^.*?'+name+'.*?$', "i")},
              {PracticeSortOrder: new RegExp('^.*?'+name+'.*?$', "i")},
              {PracticeCluster: new RegExp('^.*?'+name+'.*?$', "i")},
              {practiceShortName: new RegExp('^.*?'+name+'.*?$', "i")}
              ]
          }]     
      }; 
    }
    if(userInput.hasOwnProperty('page') && parseInt(userInput['page']) > 0){
      practiceModel.find(query).skip(currentPage).limit(LIMIT).exec(function(err, data) {
        practiceModel.count(query).exec(function(counterr, count) {
          var totalpage = Math.ceil(count/LIMIT);
          var obj = {"pages" : totalpage, "data" : data};
          callback(err,obj);
        });
      });
    }
    else{
      practiceModel.find(query).exec(callback);
    }
  }
}

function createPractice(userInput, userId, callback) {
  userInput['createdBy'] = userId;
	var practice = new practiceModel(userInput);
    practice.save(callback);
}


function editPractice(id, userInput, userId, callback) {
  var practice = practiceModel.findById(id);
  if(practice){
    userInput['lastModified'] = new Date();
    userInput['updatedBy'] = userId;
    practice.update(userInput,callback);
  }  
}


function deletePractice(id, userId, callback){  
  editPractice(id, {isDeleted:true}, userId, callback);   
};
