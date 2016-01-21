var express = require('express');
var log = require('../log');
var regionModel  = require('./../model/regionModel');
var router = express.Router();
var env_const = require('../../config/const.json');
var router = express.Router();
var PAGE = env_const.pagination.PAGE;
var LIMIT = env_const.pagination.LIMIT;

module.exports = {
  getRegion: getRegion,
  createRegion : createRegion,
  editRegion : editRegion,
  deleteRegion : deleteRegion
};


function getRegion(userInput, callback) {
  var id = userInput['id'];
  var name = userInput['name'];
  var currentPage = PAGE;
  if(id) {
    regionModel.findById(id).exec(callback);
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
              {RegionName: new RegExp('^.*?'+name+'.*?$', "i")},
              {RegionSortOrder: new RegExp('^.*?'+name+'.*?$', "i")}
              ]
          }]     
      }; 
    }
    if(userInput.hasOwnProperty('page') && parseInt(userInput['page']) > 0){
      regionModel.find(query).skip(currentPage).limit(LIMIT).exec(function(err, data) {
        regionModel.count(query).exec(function(counterr, count) {
          var totalpage = Math.ceil(count/LIMIT);
          var obj = {"pages" : totalpage, "data" : data};
          callback(err,obj);
        });
      });
    }
    else{
      regionModel.find(query).exec(callback);
    }
  }
}

function createRegion(userInput, userId, callback) {
  userInput['createdBy'] = userId;
	var region = new regionModel(userInput);
    region.save(callback);
}


function editRegion(id, userInput, userId, callback) {
  var region = regionModel.findById(id);
  if(region){
    userInput['lastModified'] = new Date();
    userInput['updatedBy'] = userId;
    region.update(userInput,callback);
  }  
}


function deleteRegion(id, userId, callback){  
  editRegion(id, {isDeleted:true}, userId, callback);   
};
