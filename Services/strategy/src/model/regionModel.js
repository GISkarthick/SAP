var express = require('express');
var mongoose  = require('mongoose');

var regionSchema = mongoose.Schema({
    ID: { type: String, required: true },
    RegionName: { type: String },
    RegionSortOrder: { type: String, },
    created: { type: Date, default: Date.now  },
    lastModified: { type: Date, default: Date.now },
    createdBy: { type: String, },
    updatedBy: { type: String, },
    isDeleted: { type: Boolean , default : false}
});

module.exports = mongoose.model('region', regionSchema);