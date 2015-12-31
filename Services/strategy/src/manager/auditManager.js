var express = require('express');
var log = require('../log');
var auditModel  = require('./../model/auditModel');
var router = express.Router();

module.exports = {
  createAudit: createAudit,
  getAudit : getAudit
};

function createAudit(userInput) {
	var audit = new auditModel(userInput);
    audit.save();
}

function getAudit(userInput, callback) {
  var id = userInput['id'];
  var name = userInput['name'];
  if(id) {
    auditModel.findById(id).exec(callback);
  }  
  else {
  	var query = {};
  	if(name){
  		query['name'] = name;
  	}
    auditModel.find(query).exec(callback);
  }
}
