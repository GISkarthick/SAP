var express = require('express');
var log = require('../log');
var initiativeModel  = require('./../model/initiativeModel');
var router = express.Router();

module.exports = {
  getInitiative: getInitiative,
};


function getInitiative(userInput, callback) {
  var id = userInput['id'];
  if(id) {
    initiativeModel.findById(id).exec(callback);
  }  
  else {
    initiativeModel.find({}).exec(callback);
  }
}
