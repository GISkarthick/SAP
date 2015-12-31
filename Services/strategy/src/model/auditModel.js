var express = require('express');
var mongoose  = require('mongoose');

var auditSchema = mongoose.Schema({

    name: { type: String , required: true },
    action: { type: String },
    actionOn: { type: Date, default: Date.now  },
    actionBy: { type: String }
});

module.exports = mongoose.model('audit', auditSchema);