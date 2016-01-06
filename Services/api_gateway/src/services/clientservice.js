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
    createProfile: function(userData, userId, callback) {
      clientRequest('user', 'createProfile', {userData: userData, userId: userId}, callback);
    },
    editProfile: function(id, userData, callback) {
      clientRequest('user', 'editProfile', {id: id, userData: userData}, callback);
    }
    deleteProfile: function(id, userId, callback) {
      clientRequest('user', 'deleteProfile', {id: id, userId: userId}, callback);
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
  initiative: {
    getInitiative: function(initiativeData, userId, callback) {
      clientRequest('other', 'getInitiative', {initiativeData: initiativeData}, callback);
    },
    createInitiative: function(initiativeData, userId, callback) {
      clientRequest('other', 'createInitiative', {initiativeData: initiativeData, userId: userId}, callback);
    },
    editInitiative: function(id, initiativeData, userId, callback) {      
      clientRequest('other', 'editInitiative', {id: id,initiativeData: initiativeData, userId: userId}, callback);
    },
    deleteInitiative: function(id, userId, callback) {
      clientRequest('other', 'deleteInitiative', {id: id, userId: userId}, callback);
    }
  },
  office: {
    getOffice: function(officeData, userId, callback) {
      clientRequest('other', 'getOffice', {officeData: officeData}, callback);
    },
    createOffice: function(officeData, userId, callback) {
      clientRequest('other', 'createOffice', {officeData: officeData, userId: userId}, callback);
    },
    editOffice: function(id, officeData, userId, callback) {      
      clientRequest('other', 'editOffice', {id: id,officeData: officeData, userId: userId}, callback);
    },
    deleteOffice: function(id, userId, callback) {
      clientRequest('other', 'deleteOffice', {id: id, userId: userId}, callback);
    }
  },
  practice: {
    getPractice: function(practiceData, userId, callback) {
      clientRequest('other', 'getPractice', {practiceData: practiceData}, callback);
    },
    createPractice: function(practiceData, userId, callback) {
      clientRequest('other', 'createPractice', {practiceData: practiceData, userId: userId}, callback);
    },
    editPractice: function(id, practiceData, userId, callback) {      
      clientRequest('other', 'editPractice', {id: id,practiceData: practiceData, userId: userId}, callback);
    },
    deletePractice: function(id, userId, callback) {
      clientRequest('other', 'deletePractice', {id: id, userId: userId}, callback);
    }
  },
  region: {
    getRegion: function(regionData, userId, callback) {
      clientRequest('other', 'getRegion', {regionData: regionData}, callback);
    },
    createRegion: function(regionData, userId, callback) {
      clientRequest('other', 'createRegion', {regionData: regionData, userId: userId}, callback);
    },
    editRegion: function(id, regionData, userId, callback) {      
      clientRequest('other', 'editRegion', {id: id,regionData: regionData, userId: userId}, callback);
    },
    deleteRegion: function(id, userId, callback) {
      clientRequest('other', 'deleteRegion', {id: id, userId: userId}, callback);
    }
  },
  audit: {
    getAudit: function(auditData, callback) {
      clientRequest('audit', 'getAudit', {auditData: auditData}, callback);
    }
  }
}