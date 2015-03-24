'use strict';
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../auth/config');
var token = {};

token.create = function (user, seconds) {
  var payload = {
    sub : user._id,
    iat : moment().unix(),
    exp : moment().add(parseInt(seconds), 'seconds').unix()
  };

  return jwt.encode(payload, config.TOKEN_SECRET);
}

token.decode = function (user) {
  var payload = user.split(' ')[1]; 
  return jwt.decode(payload, config.TOKEN_SECRET);
};

module.exports = token; 