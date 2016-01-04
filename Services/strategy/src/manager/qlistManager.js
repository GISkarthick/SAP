var express = require('express');
var log = require('../log');
var qlistModel  = require('./../model/qlistModel');
var router = express.Router();

module.exports = {
  getQlist: getQlist,
  createQlist: createQlist,
  editQlist: editQlist,
  deleteQlist: deleteQlist,
  generateStrategySearchData : generateStrategySearchData
};


function getQlist(userInput, userId, callback) {
  var id = userInput['id'];
  var name = userInput['name'];
  if(id) {
    qlistModel.findById(id).populate('officeId', '_id ID OfficeName')
    .populate('initiativeId', '_id ID InitiativeName')
    .populate('practiceId', '_id ID PracticeName')
    .populate('regionId', '_id ID RegionName').exec(callback);
  }
  else {
    var query = {isDeleted: false};
    if(userId){
      query['createdBy'] = userId;
    }
    if(name){
      query['qlistName'] = new RegExp('^.*?'+name+'.*?$', "i");
    }
    qlistModel.find(query).populate('officeId', '_id ID OfficeName')
    .populate('initiativeId', '_id ID InitiativeName')
    .populate('practiceId', '_id ID PracticeName')
    .populate('regionId', '_id ID RegionName').exec(callback);
  }
}


function createQlist(userInput, userId, callback) {
  userInput['createdBy'] = userId;
	var qlist = new qlistModel(userInput);
    qlist.save(callback);
}


function editQlist(id, userInput, userId, callback) {
  var qlist = qlistModel.findById(id);
  if(qlist){
    userInput['lastModified'] = new Date();
    userInput['updatedBy'] = userId;
    qlist.update(userInput,callback);
  }  
}


function deleteQlist(id, userId, callback){  
  editQlist(id, {isDeleted:true}, userId, callback);   
};

function generateStrategySearchData(qlist){
  var searchData = {};
  if(qlist.length > 0){
    var qlistObject = qlist[0];
    if(qlistObject.officeId && qlistObject.officeId.length > 0){
      var officeArray = getArrayValues(qlistObject.officeId);
      searchData['officeid'] = officeArray.toString();
    }
    if(qlistObject.practiceId && qlistObject.practiceId.length > 0){
      var practiceArray = getArrayValues(qlistObject.practiceId);
      searchData['practiceid'] = practiceArray.toString();
    }
    if(qlistObject.regionId && qlistObject.regionId.length > 0){
      var regionArray = getArrayValues(qlistObject.regionId);
      searchData['regionid'] = regionArray.toString();
    }
    if(qlistObject.initiativeId && qlistObject.initiativeId.length > 0){
      var initiativeArray = getArrayValues(qlistObject.initiativeId);
      searchData['initiativeid'] = initiativeArray.toString();
    }
  }
  return searchData;
}

function getArrayValues(arrayObject){
  var stringArray = [];
  for (var i = arrayObject.length - 1; i >= 0; i--) {
    stringArray.push(arrayObject[i]._id.toString());
  };
  return stringArray;
}

