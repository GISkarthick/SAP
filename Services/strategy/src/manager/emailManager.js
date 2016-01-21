var express = require('express');
var mailer = require('nodemailer');
var fs = require('fs');
var env_const = require('../../config/const.json');
var log = require('../log');
var router = express.Router();
var transporter = mailer.createTransport(env_const.mail.smtp);

module.exports = {
  sendMail: sendMail
};

function sendMail(userInput, callback) {

    var mailOptions = {
        from: env_const.mail.from,  
        to: userInput['to'], 
        subject: userInput['subject'], 
        html: userInput['body'],
        attachments: [{'filename': 'user_list.pdf', 'path'  : userInput['filedata'] }] 
    };
 
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
        callback(error, info)
    });
}

