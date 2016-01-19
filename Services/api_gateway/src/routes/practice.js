var services = require('../services/clientservice.js');
var authentication = require('../services/authentication.js');

module.exports = function(server) {
  server.get('/practice', getPractice);
  server.put('/practice', createPractice);
  server.post('/practice/:id', editPractice);
  server.del('/practice/:id', deletePractice);
};


function getPractice(req, res, next) {

  function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var clent = JSON.parse(body);
        if(clent === null  ){
          return res.send(body);
        }
        services.practice.getPractice(req.params, function(err, data) {
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
  }
  authentication.checkOauth(req, callback);

  return next();
}

function createPractice(req, res, next) {

  function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var clent = JSON.parse(body);
        if(clent === null  ){return res.send(body);}
            services.practice.createPractice(req.body, clent._id, function(err, data) {
              if (err) { return res.send({error: err});}
              res.send(data);
            });
        return null;
      }else{
        res.send({error: "invalid_token"});
      }
  }
 authentication.checkOauth(req, callback);

  return next();
}

function editPractice(req, res, next) {

  function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var clent = JSON.parse(body);
        if(clent === null  ){return res.send(body);}
            services.practice.editPractice(req.params.id, req.body, clent._id, function(err, data) {
              if (err) { return res.send({error: err});}
              res.send(data);
            });
        return null;
      }else{
        res.send({error: "invalid_token"});
      }
  }
 authentication.checkOauth(req, callback);

  return next();
}

function deletePractice(req, res, next) {

  function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var clent = JSON.parse(body);
        if(clent === null  ){return res.send(body);}
            services.practice.deletePractice(req.params.id, clent._id, function(err, data) {
              if (err) { return res.send({error: err});}
              res.send(data);
            });
        return null;
      }else{
        res.send({error: "invalid_token"});
      }
  }
 authentication.checkOauth(req, callback);

  return next();
}