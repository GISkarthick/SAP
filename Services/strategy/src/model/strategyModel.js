var express = require('express');
var mongoose  = require('mongoose');

var strategySchema = mongoose.Schema({
    strategyName: { type: String, required: true },
    strategyId: { type: String },
    description: { type: String, },
    owner: { type: String, require:true}, 
    priorityId: { type: String },
    startDate: { type: Date},
    endDate: { type: Date },
    team: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    officeId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'office'}],
    practiceId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'practice'}],
    regionId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'region'}],
    initiativeId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'initiative'}],
    //strategyAction : [{ type: mongoose.Schema.Types.ObjectId, ref: 'strategyAction'}],
    created: { type: Date, default: Date.now  },
    lastModified: { type: Date, default: Date.now },
    createdBy: { type: String, },
    updatedBy: { type: String, },
    isDeleted: { type: Boolean , default : false},
    status: {type: Number , default : 0}
});

module.exports = mongoose.model('strategy', strategySchema);