var express = require('express');
var log = require('../log');
var qlistModel  = require('./../model/qlistModel');
var router = express.Router();

module.exports = {
  getQlist: getQlist,
  createQlist: createQlist,
  editQlist: editQlist,
  deleteQlist: deleteQlist
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

