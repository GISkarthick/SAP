var express = require('express');
var mongoose  = require('mongoose');

// Define our client schema
var userSchema = new mongoose.Schema({
	EmployeeID: { type: String, required: true },
	EmpEmail: { type: String , required: true},
    password: { type: String , required: true},
    LastName: { type: String, required: true },
    FirstName: { type: String, required: true },
    SmallName: { type: String},
    EmpOffice: { type: String },
    EmpTitle: { type: String },
    EmpCustomField1: { type: String },
    EmpCustomField2: { type: String },
    EmpCustomField3: { type: String },
    IsSAPPrincipal: { type: String, default : true },
    EmpUserName: { type: String },
    IsAdmin: { type: String, default : false },
    IsSAPAccess: { type: Boolean , default : false }, 
    EmpStatus: { type: String },
    PreferredName: { type: String },
    IsSalesAccess: { type: String },
    created: { type: Date, default: Date.now  },
    lastModified: { type: Date, default: Date.now },
    isDeleted: {type: Boolean , default : false},
    status: {type: Boolean , default : true}

},{ collection: 'user' });

// Export the Mongoose model
module.exports = mongoose.model('user', userSchema);
