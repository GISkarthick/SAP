var express = require('express');
var log = require('../log');
var officeModel  = require('./../model/officeModel');
var router = express.Router();

module.exports = {
  getOffice: getOffice,
};


function getOffice(userInput, callback) {
  var id = userInput['id'];
  if(id) {
    officeModel.findById(id).exec(callback);
  }  
  else {
    officeModel.find({}).exec(callback);
  }
}
