#!/bin/sh

//var config = require('../config/app');
var env_config = require('../config/config');
var server = require('../src/server');
var broker = require('../src/broker');
var log = require('../src/log');

broker.start(function() {
  log.info('Events broker server started on %s', env_config.brokerHost);
});

server.listen(env_config.port, function() {
  log.info('%s listening at %s', server.name, server.url);
});