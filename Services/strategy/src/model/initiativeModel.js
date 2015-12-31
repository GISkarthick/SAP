var express = require('express');
var mongoose  = require('mongoose');

var initiativeSchema = mongoose.Schema({

    ID: { type: String, required: true },
    InitiativeName: { type: String },
    InitiatveSortOrder: { type: String },
    InitiativeShortName: { type: String },
    created: { type: Date, default: Date.now  },
    lastModified: { type: Date, default: Date.now },
    createdBy: { type: String, },
    updatedBy: { type: String, },
    isDeleted: { type: Boolean , default : false}
});

module.exports = mongoose.model('initiative', initiativeSchema);