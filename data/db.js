var express = require('express');
var mongoose = require('mongoose');
var app = express();

var dbName = "VPParkingApp";
var modelName = 'vpusers';
var modelRoute = '../models/users.model.js';
var model;
var crud;

mongoose.connect('mongodb://localhost/' + dbName, function (err) {
  if (err) {
    throw err;
  }
  console.log('Connected to Database');
});

model = require(modelRoute)(app, mongoose);
crud = mongoose.model(modelName);

module.exports = crud;