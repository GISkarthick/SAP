var services = require('../services/clientservice.js');
var authentication = require('../services/authentication.js');

module.exports = function(server) {
  server.get('/audit', getAudit);
  server.post('/sendmail', sendMail);
};


function getAudit(req, res, next) {

  /*function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var clent = JSON.parse(body);
        if(clent === null  ){
          return res.send(body);
        }
        services.other.getAudit(req.params, function(err, data) {
          if (err) { 
            return res.send({
              error: err
            });
          }
          res.send(data);
        });
        return null;
      }else{
        res.send({error: "invalid_token"});
      }
  }*/
  //
//authentication.checkOauth(req, callback);
authentication.checkADtoken(req,res, callback);
  services.audit.getAudit(req.params, function(err, data) {
    if (err) { 
      return res.send({
        error: err
      });
    }
    res.send(data);
  });

  return next();
}

function sendMail(req, res, next) {

  function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var clent = JSON.parse(body);
        if(clent === null  ){return res.send(body);}
            services.email.sendMail(req.body, function(err, data) {
              if (err) { return res.send({error: err});}
              res.send(data);
            });
        return null;
      }else{
        res.send({error: "invalid_token"});
      }
  }
 
//authentication.checkOauth(req, callback);
authentication.checkADtoken(req,res, callback);

  return next();
}


