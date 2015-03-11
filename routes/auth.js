var express = require('express');
var routerAuth = express.Router();
var crud = require('../data/db');
var moment = require('moment');
var tokenUtil = require('../auth/token');
var validUntil = 60;
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

        var resp = {
          name : user.name,
          email : user.email,
          token : tk
        };

        res.jsonp(resp);

      } else {
        res.send(false);
      }
    }
  });
  
});

// Check if token is valid
routerAuth.get('/', function(req, res, next) {
  if (!validateHeaders(req.headers)) {
    return res
      .status(403)
      .send({message : missingHeader});
  }

  var token = tokenUtil.decode(req.headers.token);

  // validate the token
  crud.findById(token.sub, function(err, user) {
    if (err) {
      return res.jsonp ({login: 'error ' + err});
    } else {
      if (token.exp <= moment().unix()) {
        return res
          .status(401)
          .jsonp ({message : expired});
      }
    }
  });
  
  // next();
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
