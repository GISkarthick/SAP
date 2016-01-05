var Client = require('pigato').Client;
var env_config = require('../../config/config');

var client = new Client(env_config.brokerHost);
client.start();

client.on('error', function(e) {
  console.log('PIGATO CLIENT ERROR', e);
});

function clientRequest(service, op, params, callback) {
  client.request(
    service,
    {op: op, params: params},
    null,
    function(err, data) {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(data.error, data.result);
    },
    {timeout: 5000}
  );
}

module.exports = {
  user: {
    getProfile: function(userData, callback) {
      clientRequest('user', 'getProfile', {userData: userData}, callback);
    },
    editProfile: function(id, userData, callback) {
      clientRequest('user', 'editProfile', {id: id, userData: userData}, callback);
    }
  },
  strategy: {
    getStrategy: function(strategyData, userId, callback) {
      clientRequest('strategy', 'getStrategy', {strategyData: strategyData, userId: userId}, callback);
    },
    getStrategyByQlist: function(qlistname, userId, callback) {
      clientRequest('strategy', 'getStrategyByQlist', {qlistname: qlistname, userId: userId}, callback);
    },
    searchStrategy: function(strategyData, userId, callback) {
      clientRequest('strategy', 'searchStrategy', {strategyData: strategyData, userId: userId}, callback);
    },
    createStrategy: function(strategyData, userId, callback) {
      clientRequest('strategy', 'createStrategy', {strategyData: strategyData, userId: userId}, callback);
    },
    editStrategy: function(id, strategyData, userId, callback) {      
      clientRequest('strategy', 'editStrategy', {id: id,strategyData: strategyData, userId: userId}, callback);
    },
    deleteStrategy: function(id, userId, callback) {
      clientRequest('strategy', 'deleteStrategy', {id: id, userId: userId}, callback);
    }
  },
  strategyAction: {
    getStrategyAction: function(strategyActionData, callback) {
      clientRequest('strategyaction', 'getStrategyAction', {strategyActionData: strategyActionData}, callback);
    },
    createStrategyAction: function(strategyActionData, userId, callback) {
      clientRequest('strategyaction', 'createStrategyAction', {strategyActionData: strategyActionData, userId: userId}, callback);
    },
    editStrategyAction: function(id, strategyActionData, userId, callback) {      
      clientRequest('strategyaction', 'editStrategyAction', {id: id,strategyActionData: strategyActionData, userId: userId}, callback);
    },
    deleteStrategyAction: function(id, userId, callback) {
      clientRequest('strategyaction', 'deleteStrategyAction', {id: id, userId: userId}, callback);
    }
  },
  qlist: {
    getQlist: function(qlistData, userId, callback) {
      clientRequest('qlist', 'getQlist', {qlistData: qlistData, userId: userId}, callback);
    },
    createQlist: function(qlistData, userId, callback) {
      clientRequest('qlist', 'createQlist', {qlistData: qlistData, userId: userId}, callback);
    },
    editQlist: function(id, qlistData, userId, callback) {      
      clientRequest('qlist', 'editQlist', {id: id,qlistData: qlistData, userId: userId}, callback);
    },
    deleteQlist: function(id, userId, callback) {
      clientRequest('qlist', 'deleteQlist', {id: id, userId: userId}, callback);
    }
  },
  other: {
    getInitiative: function(initiativeData, callback) {
      clientRequest('other', 'getInitiative', {initiativeData: initiativeData}, callback);
    },
    getOffice: function(officeData, callback) {
      clientRequest('other', 'getOffice', {officeData: officeData}, callback);
    },
    getPractice: function(practiceData, callback) {
      clientRequest('other', 'getPractice', {practiceData: practiceData}, callback);
    },
    getRegion: function(regionData, callback) {
      clientRequest('other', 'getRegion', {regionData: regionData}, callback);
    }
  },
  audit: {
    getAudit: function(auditData, callback) {
      clientRequest('audit', 'getAudit', {auditData: auditData}, callback);
    }
  }
}