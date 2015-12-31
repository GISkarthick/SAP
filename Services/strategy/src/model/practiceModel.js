var express = require('express');
var mongoose  = require('mongoose');

var practiceSchema = mongoose.Schema({

    ID: { type: String, required: true },
    PracticeName: { type: String },
    PracticeSortOrder: { type: String },
    PracticeCluster: { type: String },
    practiceShortName: { type: String },
    created: { type: Date, default: Date.now  },
    lastModified: { type: Date, default: Date.now },
    createdBy: { type: String, },
    updatedBy: { type: String, },
    isDeleted: { type: Boolean , default : false}
});

module.exports = mongoose.model('practice', practiceSchema);