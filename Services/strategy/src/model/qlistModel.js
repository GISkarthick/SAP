var express = require('express');
var mongoose  = require('mongoose');

var qlistSchema = mongoose.Schema({
    qlistName: { type: String, required: true },
    officeId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'office'}],
    practiceId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'practice'}],
    regionId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'region'}],
    initiativeId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'initiative'}],
    priorityId: { type: String },
    strategyStatus : {type: Number},
    created: { type: Date, default: Date.now  },
    lastModified: { type: Date, default: Date.now },
    createdBy: { type: String, },
    updatedBy: { type: String, },
    isDeleted: { type: Boolean , default : false},
    status: {type: String}
});

module.exports = mongoose.model('qlist', qlistSchema);