var express = require('express');
var log = require('../log');
var regionModel  = require('./../model/regionModel');
var router = express.Router();

module.exports = {
  getRegion: getRegion,
};


function getRegion(userInput, callback) {
  var id = userInput['id'];
  if(id) {
    regionModel.findById(id).exec(callback);
  }  
  else {
    regionModel.find({}).exec(callback);
  }
}
