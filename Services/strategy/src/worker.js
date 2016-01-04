var log = require('./log');
var env_config = require('../config/config');
var Worker = require('pigato').Worker;
var strategyManager = require('./manager/strategyManager');
var userManager = require('./manager/userManager');
var strategyActionManager = require('./manager/strategyActionManager');
var qlistManager = require('./manager/qlistManager');
var initiativeManager = require('./manager/initiativeManager');
var officeManager = require('./manager/officeManager');
var practiceManager = require('./manager/practiceManager');
var regionManager = require('./manager/regionManager');
var auditManager = require('./manager/auditManager');

var worker = new Worker(env_config.brokerHost, 'other');
var worker_user = new Worker(env_config.brokerHost, 'user');
var worker_strategy = new Worker(env_config.brokerHost, 'strategy');
var worker_strategyAction = new Worker(env_config.brokerHost, 'strategyaction');
var worker_qlist = new Worker(env_config.brokerHost, 'qlist');
var worker_audit = new Worker(env_config.brokerHost, 'audit');

worker.on('error', function(e) {
  log.error('Worker error', e);
});
worker_user.on('error', function(e) {
  log.error('Worker error', e);
});
worker_strategy.on('error', function(e) {
  log.error('Worker error', e);
});
worker_strategyAction.on('error', function(e) {
  log.error('Worker error', e);
});
worker_qlist.on('error', function(e) {
  log.error('Worker error', e);
});
worker_audit.on('error', function(e) {
  log.error('Worker error', e);
});

worker.on('request', function(input, rep) {
  log.info('Worker request', input);

  switch(input.op) {
    case 'getInitiative':
      log.info('Finding data...');
      initiativeManager.getInitiative(input.params.initiativeData, function(err, data) {
        rep.end({result: data, error: err});
      });
      break;
    case 'getOffice':
      log.info('Finding data...');
      officeManager.getOffice(input.params.officeData, function(err, data) {
        rep.end({result: data, error: err});
      });
      break;
    case 'getPractice':
      log.info('Finding data...');
      practiceManager.getPractice(input.params.practiceData, function(err, data) {
        rep.end({result: data, error: err});
      });
      break;
    case 'getRegion':
      log.info('Finding data...');
      regionManager.getRegion(input.params.regionData, function(err, data) {
        rep.end({result: data, error: err});
      });
      break;        
          
  }
});

worker_user.on('request', function(input, rep) {
  log.info('Worker request', input);

  switch(input.op) {
    case 'getProfile':
      log.info('Finding user...');
      userManager.getProfile(input.params.userData, function(err, user) {
        rep.end({result: user, error: err});
      });
      break;  
    case 'editProfile':
      log.info('Editing a user...');      
      userManager.editProfile(input.params.id, input.params.userData, function(err, user) {
        rep.end({result: user, error: err});
      });
      break;
          
  }
});

worker_strategy.on('request', function(input, rep) {
  log.info('Worker request', input);

  switch(input.op) {
    case 'getStrategy':
      log.info('Finding strategy...');
      strategyManager.getStrategy(input.params.strategyData, input.params.userId, function(err, strategy) {
        rep.end({result: strategy, error: err});
      });
      break; 
    case 'getStrategyByQlist':
      log.info('Finding strategy By Qlist...');
      qlistManager.getQlist({'name' : input.params.qlistname}, input.params.userId, function(err, qlist) {
        
        var searchData = qlistManager.generateStrategySearchData(qlist);
        strategyManager.getStrategy(searchData, input.params.userId, function(err, strategy) {
          rep.end({result: strategy, error: err});
        });
      });
      break;   
    case 'createStrategy':
      log.info('Creating a new strategy...');
      strategyManager.createStrategy(input.params.strategyData, input.params.userId, function(err, strategy) {
        auditManager.createAudit({"name" : "strategy", "action" : "create", "actionBy" : input.params.userId});
        strategyManager.getStrategy({"id" : strategy._id}, input.params.userId, function(err, strategy) {
          rep.end({result: strategy, error: err});
        });  
        //rep.end({result: strategy, error: err});
      });
      break;
    case 'editStrategy':
      log.info('Editing a strategy...');      
      strategyManager.editStrategy(input.params.id, input.params.strategyData, input.params.userId, function(err, strategy) {
        auditManager.createAudit({"name" : "strategy", "action" : "edit", "actionBy" : input.params.userId});
        rep.end({result: strategy, error: err});
      });
      break;
    case 'deleteStrategy':
      log.info('Deleting a strategy...');
      strategyManager.deleteStrategy(input.params.id, input.params.userId, function(err, strategy) {
        auditManager.createAudit({"name" : "strategy", "action" : "delete", "actionBy" : input.params.userId});
        rep.end({result: strategy, error: err});
      });
      break;      
  }
});

worker_strategyAction.on('request', function(input, rep) {
  log.info('Worker request', input);

  switch(input.op) {
    case 'getStrategyAction':
      log.info('Finding strategyAction...');
      strategyActionManager.getStrategyAction(input.params.strategyActionData, function(err, strategyAction) {
        rep.end({result: strategyAction, error: err});
      });
      break;  
    case 'createStrategyAction':
      log.info('Creating a new strategyAction...');
      strategyActionManager.createStrategyAction(input.params.strategyActionData, input.params.userId, function(err, strategyAction) {
        auditManager.createAudit({"name" : "strategyAction", "action" : "create", "actionBy" : input.params.userId});
        rep.end({result: strategyAction, error: err});
      });
      break;
    case 'editStrategyAction':
      log.info('Editing a strategyAction...');      
      strategyActionManager.editStrategyAction(input.params.id, input.params.strategyActionData, input.params.userId, function(err, strategyAction) {
        auditManager.createAudit({"name" : "strategyAction", "action" : "edit", "actionBy" : input.params.userId});
        rep.end({result: strategyAction, error: err});
      });
      break;
    case 'deleteStrategyAction':
      log.info('Deleting a strategyAction...');
      strategyActionManager.deleteStrategyAction(input.params.id, input.params.userId, function(err, strategyAction) {
        auditManager.createAudit({"name" : "strategyAction", "action" : "delete", "actionBy" : input.params.userId});
        rep.end({result: strategyAction, error: err});
      });
      break;      
  }
});

worker_qlist.on('request', function(input, rep) {
  log.info('Worker request', input);

  switch(input.op) {
    case 'getQlist':
      log.info('Finding qlist...');
      qlistManager.getQlist(input.params.qlistData, input.params.userId, function(err, qlist) {
        rep.end({result: qlist, error: err});
      });
      break;  
    case 'createQlist':
      log.info('Creating a new qlist...');
      qlistManager.createQlist(input.params.qlistData, input.params.userId, function(err, qlist) {
        auditManager.createAudit({"name" : "qlist", "action" : "create", "actionBy" : input.params.userId});
        qlistManager.getQlist({"id" : qlist._id}, input.params.userId, function(err, qlist) {
          rep.end({result: qlist, error: err});
        });
        //rep.end({result: qlist, error: err});
      });
      break;
    case 'editQlist':
      log.info('Editing a qlist...');      
      qlistManager.editQlist(input.params.id, input.params.qlistData, input.params.userId, function(err, qlist) {
        auditManager.createAudit({"name" : "qlist", "action" : "edit", "actionBy" : input.params.userId});
        rep.end({result: qlist, error: err});
      });
      break;
    case 'deleteQlist':
      log.info('Deleting a qlist...');
      qlistManager.deleteQlist(input.params.id, input.params.userId, function(err, qlist) {
        auditManager.createAudit({"name" : "qlist", "action" : "delete", "actionBy" : input.params.userId});
        rep.end({result: qlist, error: err});
      });
      break;      
  }
});

worker_audit.on('request', function(input, rep) {
  log.info('Worker request', input);

  switch(input.op) {
    case 'getAudit':
      log.info('Finding qlist...');
      auditManager.getAudit(input.params.auditData, function(err, auditData) {
        rep.end({result: auditData, error: err});
      });
      break;  
          
  }
});
 
module.exports = {
  start: function() {
    log.info('Starting worker, broker ' + env_config.brokerHost + '...');
    worker.start();
    worker_strategy.start();
    worker_user.start();
    worker_strategyAction.start();
    worker_qlist.start();
    worker_audit.start();
  }
};

