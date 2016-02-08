var services = require('../services/clientservice.js');
var request = require('request');
var querystring = require('querystring');
var env_config = require('../../config/config');

var verifyURL = '/oauth/token/verify';
var removeTokenURL = '/oauth/token';
var authcodeURL = '/oauth/code';
var authtokenURL = '/oauth/token';
var aadJwt = require('./aadJWT.js');

module.exports = {
  checkOauth: checkOauth,
  checkADtoken: checkADtoken,
  removeToken: removeToken,
  getCode : getCode,
  getToken : getToken
};

/*
 * checkOauth.
 */
function checkOauth(req , callback) {
	var options = {
  		url: env_config.authUrl + verifyURL,
  		headers: { 'authorization': req.headers["authorization"] }
	};
 
	request(options, callback);
}

function removeToken(req , callback) {
	console.log(req.headers["authorization"])
	var options = {
  		url: env_config.authUrl + removeTokenURL,
  		method: 'DELETE',
  		headers: { 'authorization': req.headers["authorization"] }
	};
 
	request(options, callback);
}

function getCode(req , callback) {
    var formData = querystring.stringify(req.params);
    var contentLength = formData.length;        
	var options = {
  		url: env_config.authUrl + authcodeURL,
  		method: 'POST',
  		body: formData,
  		headers: {
  			'Content-Length': contentLength,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
	};
 	console.log(options)
	request(options, callback);
}

function getToken(inputData , callback) {
	var formData = querystring.stringify(inputData);
	var contentLength = formData.length;
	var options = {
  		url: env_config.authUrl + authtokenURL,
  		body: formData,
  		method: 'POST',
  		headers: {
  			'Content-Length': contentLength,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
	};
 
	request(options, callback);
}
/*
Author Ratheesh 
AD token check.
*/
function checkADtoken(req ,res, callback) {
   aadJwt.validateRequest(req, res, function (authorized) {
        if (authorized){
            callback(null,{statusCode:200},JSON.stringify(req.user)); // make sure we go to the next routes and don't stop here
        }
        else {
            callback(null,{});
        }
        console.log(JSON.stringify(req.user));
    });
}
