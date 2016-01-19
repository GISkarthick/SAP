var services = require('../services/clientservice.js');
var authentication = require('../services/authentication.js');

module.exports = function(server) {
  server.get('/office', getOffice);
  server.put('/office', createOffice);
  server.post('/office/:id', editOffice);
  server.del('/office/:id', deleteOffice);
};


function getOffice(req, res, next) {

  function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var clent = JSON.parse(body);
        if(clent === null  ){
          return res.send(body);
        }
        services.office.getOffice(req.params, function(err, data) {
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

function createOffice(req, res, next) {

  function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var clent = JSON.parse(body);
        if(clent === null  ){return res.send(body);}
            services.office.createOffice(req.body, clent._id, function(err, data) {
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

function editOffice(req, res, next) {

  function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var clent = JSON.parse(body);
        if(clent === null  ){return res.send(body);}
            services.office.editOffice(req.params.id, req.body, clent._id, function(err, data) {
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

function deleteOffice(req, res, next) {

  function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var clent = JSON.parse(body);
        if(clent === null  ){return res.send(body);}
            services.office.deleteOffice(req.params.id, clent._id, function(err, data) {
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