var express = require('express');
var mongoose  = require('mongoose');

var qlistSchema = mongoose.Schema({
    qlistName: { type: String, required: true },
    created: { type: Date, default: Date.now  },
    lastModified: { type: Date, default: Date.now },
    createdBy: { type: String, },
    updatedBy: { type: String, },
    isDeleted: { type: Boolean , default : false},
    status: {type: String}
});

module.exports = mongoose.model('qlist', qlistSchema);