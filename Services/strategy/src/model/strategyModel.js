var express = require('express');
var env_config = require('../../config/config');
var mongoose  = require('mongoose');

var strategySchema = mongoose.Schema({
    strategyName: { type: String, required: true },
    strategyId: { type: String },
    description: { type: String, },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user', require:true}, 
    priorityId: { type: String },
    startDate: { type: Date},
    endDate: { type: Date },
    team: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    officeId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'office'}],
    practiceId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'practice'}],
    regionId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'region'}],
    initiativeId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'initiative'}],
    actions: {type: Number , default : 0},
    completedActions: {type: Number , default : 0},
    created: { type: Date, default: Date.now  },
    lastModified: { type: Date, default: Date.now },
    createdBy: { type: String, },
    updatedBy: { type: String, },
    isDeleted: { type: Boolean , default : false},
    status: {type: Number , default : 0}
});
// sort error corrected.

function getpriorityIdValue(Value) {
    return env_config.priorityIdValue[Value-1];
}
strategySchema.pre('save', function (next) {
  // update the value
  this.priorityId=env_config.priorityIdValues[this.priorityId.toLowerCase()];
  next();
})
strategySchema.post('save', function (strategy) {
  // update the value lable
  strategy.priorityId=getpriorityIdValue(+strategy.priorityId);
  // next();
})
strategySchema.pre('update', function (next) {
  // update the value
  // this.priorityId=env_config.priorityIdValues[this.priorityId.toLowerCase()];
  next();
})
strategySchema.post('update', function (strategy) {
  // update the value lable
 // console.log(strategy); 
// strategy.priorityId=getpriorityIdValue(+strategy.priorityId);
  // next();
})
strategySchema.post('findOne', function(doc) {
  // update the value lable
  doc.priorityId=getpriorityIdValue(+doc.priorityId);
});
strategySchema.post('find', function(doc) {
  // update the value lable
  for(var j = 0, length2 = doc.length; j < length2; j++){
    doc[j].priorityId=getpriorityIdValue(+doc[j].priorityId);
  }
});
module.exports = mongoose.model('strategy', strategySchema);