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


function getQlist(userInput, callback) {
  var id = userInput['id'];
  var createdBy = userInput['userid'];
  if(id) {
    qlistModel.findById(id).exec(callback);
  }
  else if(createdBy){
    qlistModel.find({createdBy: createdBy, isDeleted: false}).exec(callback);
  }  
  else {
    qlistModel.find({isDeleted: false}).exec(callback);
  }
}


function createQlist(userInput, callback) {
	var qlist = new qlistModel(userInput);
    qlist.save(callback);
}


function editQlist(id, userInput, callback) {
  var qlist = qlistModel.findById(id);
  if(qlist){
    userInput['lastModified'] = new Date();
    qlist.update(userInput,callback);
  }  
}


function deleteQlist(id, callback){  
  editQlist(id, {isDeleted:true}, callback);   
};

