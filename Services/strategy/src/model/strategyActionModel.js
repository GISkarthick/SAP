var express = require('express');
var mongoose  = require('mongoose');

var strategyActionSchema = mongoose.Schema({
    strategyActionName: { type: String, required: true },
    strategyId: { type: mongoose.Schema.Types.ObjectId, ref: 'strategy'},
    description: { type: String },
    created: { type: Date, default: Date.now  },
    lastModified: { type: Date, default: Date.now },
    createdBy: { type: String },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    isDeleted: { type: Boolean , default : false},
    status: {type: Boolean},
    completedDate: { type: Date }
});

module.exports = mongoose.model('strategyAction', strategyActionSchema);