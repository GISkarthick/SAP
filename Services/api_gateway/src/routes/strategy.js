var services = require('../services/clientservice.js');
var authentication = require('../services/authentication.js');

module.exports = function(server) {
  // server.get('/strategy', getStrategy);
  server.get('/strategy', getStrategyPagination);
  // server.get('/strategypagination', getStrategyPagination);
  server.get('/strategy/:qlistname', getStrategyByQlist);
  server.post('/strategysearch', searchStrategy);
  server.put('/strategy', createStrategy);
  server.post('/strategy/:id', editStrategy);
  server.del('/strategy/:id', deleteStrategy);
  server.get('/lookups', getLookups);
};


function getStrategy(req, res, next) {

  function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var clent = JSON.parse(body);
        if(clent === null  ){
          return res.send(body);
        }
        services.strategy.getStrategy(req.params, clent.upn, function(err, data) {
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
  
//authentication.checkOauth(req, callback);
authentication.checkADtoken(req,res, callback);

  return next();
}

function getLookups(req, res, next) {

  function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var clent = JSON.parse(body);
        if(clent === null  ){
          return res.send(body);
        }
        services.strategy.getLookups(req.params, clent, function(err, data) {
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
  
//authentication.checkOauth(req, callback);
authentication.checkADtoken(req,res, callback);

  return next();
}
function getStrategyPagination(req, res, next) {

  function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var clent = JSON.parse(body);
        if(clent === null  ){
          return res.send(body);
        }
        services.strategy.getStrategyPagination(req.params, clent.upn, function(err, data) {
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
  
//authentication.checkOauth(req, callback);
authentication.checkADtoken(req,res, callback);

  return next();
}

function getStrategyByQlist(req, res, next) {

  function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var clent = JSON.parse(body);
        if(clent === null  ){
          return res.send(body);
        }
        services.strategy.getStrategyByQlist(req.params.qlistname, clent.upn, function(err, data) {
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
  
//authentication.checkOauth(req, callback);
authentication.checkADtoken(req,res, callback);

  return next();
}

function searchStrategy(req, res, next) {

  function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var clent = JSON.parse(body);
        if(clent === null  ){return res.send(body);}
            services.strategy.searchStrategy(req.body, clent.upn, function(err, data) {
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

function createStrategy(req, res, next) {

  function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var clent = JSON.parse(body);
        if(clent === null  ){return res.send(body);}
            services.strategy.createStrategy(req.body, clent.upn, function(err, data) {
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

function editStrategy(req, res, next) {

  function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var clent = JSON.parse(body);
        if(clent === null  ){return res.send(body);}
            services.strategy.editStrategy(req.params.id, req.body, clent.upn, function(err, data) {
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

function deleteStrategy(req, res, next) {

  function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var clent = JSON.parse(body);
        if(clent === null  ){return res.send(body);}
            services.strategy.deleteStrategy(req.params.id, clent.upn, function(err, data) {
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