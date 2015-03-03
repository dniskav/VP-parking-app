var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var app = express();

mongoose.connect('mongodb://localhost/users', function (err) {
  if (err) {
    throw err;
  }
  console.log('Connected to Database');
});

var model = require('../models/users.model.js')(app, mongoose);
var crud = mongoose.model('userSchm');

// Utilities
var normalizePlate = function (plate) {
  return plate.match(/[A-Za-z0-9]/gi).join('').toUpperCase();
};

/* GET */
router.get('/', function (req, res) {
  // here get the data from DB
  crud.find(function (err, users) {
    if (err) {
      return res.send(500, err.message);
    }
    res.jsonp(users);
  });

});

/* GET by _id*/
router.get('/:id', function (req, res) {
  var id = req.params.id,
  resp;

  crud.findById(id, function (err, user) {
    if (err) {
      return res.send(500, err.message);
    };
    res.jsonp(user);    
  });  
});

/* POST */
router.post('/', function (req, res) {
  var data = req.body;
  // build the object to save in the database
  var newUser = new crud({
    name : data.name,
    plate : normalizePlate(data.plate),
    type : data.type,
    active : false,
    visible: false
  });

  // here save the data in DB
  newUser.save(function (err, resp) {
    if (err) {
      return res.send(500, err.message);
    };
    res.jsonp({user: newUser, saved : true});
  });
});

/* PUT by _id */
router.put('/:id', function (req, res) {
  var data = req.body,
      id = req.params.id;
  if (data.plate) {
    data.plate = normalizePlate(data.plate);
  }

  if (id !== false && req.body) {
    crud.findById(id, function(err, user) {
      user.name = data.name || user.name;
      user.plate = data.plate || user.plate;
      user.type = data.type || user.type;
      user.active = data.active || user.active;
      user.visible = data.visible || user.visible;

      user.save(function (err) {
        if (err) return res.send(500, err.message);
        res.jsonp({user: id, saved : true});
      });
    });
  } else {
    res.jsonp({error: "User not found"});
  };
});

module.exports = router;
