var express = require('express');
var mongoose  = require('mongoose');

var officeSchema = mongoose.Schema({

    ID: { type: String, required: true },
    OfficeName: { type: String },
    OfficeSortOrder: { type: String, },
    OfficeCluster: { type: String, require:true}, 
    OfficeShortName: { type: String },
    OfficeMDEmpNo: { type: Date},
    created: { type: Date, default: Date.now  },
    lastModified: { type: Date, default: Date.now },
    createdBy: { type: String, },
    updatedBy: { type: String, },
    isDeleted: { type: Boolean , default : false}
});

module.exports = mongoose.model('office', officeSchema);