var express = require('express');
var mongoose = require('mongoose');
// Define lookup schema
var lookupSchema = new mongoose.Schema({
    initiatives: [{type: mongoose.Schema, ref: 'initiative'}],
    offices: [{type: mongoose.Schema, ref: 'office'}],
    practices: [{type: mongoose.Schema, ref: 'practice'}],
    regions: [{type: mongoose.Schema, ref: 'region'}]
});
// Export the Mongoose model
module.exports = mongoose.model('lookups', lookupSchema, 'lookups');