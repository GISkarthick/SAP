var express = require('express');
var log = require('../log');
var officeModel  = require('./../model/officeModel');
var env_const = require('../../config/const.json');
var router = express.Router();
var PAGE = env_const.pagination.PAGE;
var LIMIT = env_const.pagination.LIMIT;

module.exports = {
  getOffice: getOffice,
  createOffice : createOffice,
  editOffice : editOffice,
  deleteOffice : deleteOffice
};


function getOffice(userInput, callback) {
  var id = userInput['id'];
  var name = userInput['name'];
  var currentPage = PAGE;
  if(id) {
    officeModel.findById(id).exec(callback);
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
              {OfficeName: new RegExp('^.*?'+name+'.*?$', "i")},                                
              {OfficeSortOrder: new RegExp('^.*?'+name+'.*?$', "i")},
              {OfficeCluster: new RegExp('^.*?'+name+'.*?$', "i")},                                
              {OfficeShortName: new RegExp('^.*?'+name+'.*?$', "i")},
              {OfficeMDEmpNo: new RegExp('^.*?'+name+'.*?$', "i")},
              ]
          }]     
      }; 
    }
    
    if(userInput.hasOwnProperty('page') && parseInt(userInput['page']) > 0){
      officeModel.find(query).skip(currentPage).limit(LIMIT).exec(function(err, data) {
        officeModel.count(query).exec(function(counterr, count) {
          var totalpage = Math.ceil(count/LIMIT);
          var obj = {"pages" : totalpage, "data" : data};
          callback(err,obj);
        });
      });
    }
    else{
      officeModel.find(query).exec(callback);
    }
    
  }
}

function createOffice(userInput, userId, callback) {
  userInput['createdBy'] = userId;
	var office = new officeModel(userInput);
    office.save(callback);
}


function editOffice(id, userInput, userId, callback) {
  var office = officeModel.findById(id);
  if(office){
    userInput['lastModified'] = new Date();
    userInput['updatedBy'] = userId;
    office.update(userInput,callback);
  }  
}


function deleteOffice(id, userId, callback){  
  editOffice(id, {isDeleted:true}, userId, callback);   
};
