'use strict';

var app = require('express')();
var crud = require('../data/db');
var moment = require('moment');
var tokenUtil = require('../auth/token');
var validUntil = 1200;
var expired = 'token expired';
var missingHeader = 'Missing headers';
var unauth = "Unauthorized";

var validateHeaders = function (headers) {
  if(headers.authorization) {
    return true;
  }
  return false;
}

app.use(function (req, res, next) {
  if(req.url == '/auth' && req.method == 'POST') {
    next();
  } else {
    if (!validateHeaders(req.headers)) {
      return res
        .status(403)
        .send({message : missingHeader});
    };


    var token;
    
    try {
      token = tokenUtil.decode(req.headers.authorization)
    } catch (err) {
      return res
        .status(403)
        .send({message : missingHeader});
    }

    // validate the token
    crud.findById(token.sub, function(err, user) {
      if (err) {
        return res.jsonp ({login: 'error ' + err});
      } else if (token.exp <= moment().unix()) {
          return res
            .status(401)
            .jsonp ({message : expired});
      } else {
        // use the socket if the method is POST, PUT or delete
        if ((req.method == 'POST' || req.method == 'PUT' || req.method == 'DELETE')) {
          if (user.role > 0) {
            return res
              .status(401)
              .jsonp ({message : unauth});            
          } else {
            sockets.emit ('DC', {dataUpdated : true});
          }
        };
        next();
      }
    });
  }
});

module.exports = app;