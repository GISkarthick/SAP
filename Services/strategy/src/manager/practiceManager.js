var express = require('express');
var log = require('../log');
var practiceModel  = require('./../model/practiceModel');
var router = express.Router();

module.exports = {
  getPractice: getPractice,
};


function getPractice(userInput, callback) {
  var id = userInput['id'];
  if(id) {
    practiceModel.findById(id).exec(callback);
  }  
  else {
    practiceModel.find({}).exec(callback);
  }
}
