var express = require('express');
var routerAuth = express.Router();
var crud = require('../data/db');
var moment = require('moment');
var tokenUtil = require('../auth/token');
var validUntil = 1200;
var expired = 'token expired';
var missingHeader = 'Missing headers';

var validateHeaders = function (headers) {
  if(headers.token) {
    return true;
  }
  return false;
}


/* Manage the auth request */
routerAuth.post('/', function(req, res) {
  var data = req.body,
      resp = '';

  // search user im db
  crud.findOne({'email' : data.email, 'pwd' : data.pwd}, function(err, user) {
    if (err) {
      res.jsonp ({login: 'error ' + err});
    } else {
      if (user) {
        var tk = tokenUtil.create(user, validUntil);

        res
          .status(200)
          .jsonp({
            token : tk
          });
      } else {
        res
          .status(401)
          .send();
      }
    }
  });
  
});

// logout
routerAuth.delete('/', function(req, res) {
  var token = req.headers.token;

  // search user im db
  crud.findOne({'token' : token}, function(err, user) {
    if (err) {
      res.jsonp ({login: 'error ' + err});
    } else {
      if (user) {
        user.token = undefined;
        user.save(function (err) {
          if (err) return res.status(status).send(500, err.message);
          res.jsonp ({logout : true});
        });
      } else {
        res.jsonp ({logout : false});
      }
    }
  });
  
});

module.exports = routerAuth;
