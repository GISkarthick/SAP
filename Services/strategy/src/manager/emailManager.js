var express = require('express');
var mailer = require('nodemailer');
//var pdfmake = require('pdfmake');
var fs = require('fs');
var env_const = require('../../config/const.json');
var log = require('../log');
var router = express.Router();
var transporter = mailer.createTransport(env_const.mail.smtp);

module.exports = {
  sendMail: sendMail
};

function sendMail(userInput, callback) {

	fs.readFile('/home/ramprasath/Documents/file.pdf', function (err, data) {

        var mailOptions = {
            from: env_const.mail.from,  
            to: userInput['to'], 
            subject: userInput['subject'], 
            html: userInput['body'],
            attachments: [{'filename': 'file.pdf', 'content': data}] 
        };
     
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
            callback(error, info)
        });
   
    });
}

/*function createUserPdf(){

    var pdfData = [[ { text: "EmployeeID", bold: true }, { text: "Email", bold: true }
    , { text: "FirstName", bold: true }, { text: "LastName", bold: true }, 
    { text: "UserName", bold: true }, { text: "Status", bold: true }]];

    for (var i = 0; i < $scope.userList.length; i++) {
      var user = [];
      user.push($scope.userList[i].EmployeeID);
      user.push($scope.userList[i].EmpEmail);
      user.push($scope.userList[i].FirstName);
      user.push($scope.userList[i].LastName);
      user.push($scope.userList[i].EmpUserName);
      user.push($scope.userList[i].EmpStatus);
      pdfData.push(user);
    };

    var docDefinition = {
      content: [
        {
          table: {
            headerRows: 1,
            widths: [ '*', 'auto', '*', '*', '*', '*' ],
            body: pdfData
          }
        }
      ]
    };
    pdfMake.createPdf(docDefinition).download();

}*/
