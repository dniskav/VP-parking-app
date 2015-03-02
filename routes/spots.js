var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// Hardcoded info for know, will be serve by db when defined.
var users = [
  { name : "Dale", plate : "KEY 285", type : "car", active : true, visible: true },
  { name : "Scrooge", plate : "MOE 231", type : "motorcycle", active : false, visible: true },
  { name : "Mickey", plate : "MOE 613", type : "car", active : true, visible: true },
  { name : "Donal", plate : "XWQ 673", type : "motorcycle", active : true, visible: true },
  { name : "Goofy", plate : "QED 864", type : "car", active : true, visible: true },
  { name : "Minnie", plate : "VCX 123", type : "car", active : true, visible: true },
  { name : "Daffy", plate : "IHG 422", type : "car", active : false, visible: true },
  { name : "Pluto", plate : "UJB 664", type : "car", active : true, visible: true },
  { name : "Chip", plate : "FDF 814", type : "motorcycle", active : true, visible: true },
  { name : "John", plate : "CAF 253", type : "motorcycle", active : true, visible : true}
];


// Utilities
var normalizePlate = function(plate) {
  return plate.match(/[A-Za-z0-9]/gi).join('').toUpperCase();  
};

var searchUser = function(id) {
  var res = false;
  users.forEach(function(item, ndx) {
    var plate = normalizePlate(id),
        rPlate = normalizePlate(item.plate);

    if(rPlate === plate) {
      res = ndx;
    }

  });
  return res;
};

/* GET home page. */
router.get('/', function(req, res) {

  // here get the data from DB
  setTimeout(function(){
    res.jsonp(users);
  }, 500);
  
});

router.get('/:id', function(req, res) {
  var ndx = searchUser(req.params.id),
  resp;

  console.log(ndx, searchUser(req.params.id));
  resp = (ndx !== false)? users[ndx] : {error: 'User ' + req.params.id + ' not found!'}

  // here get the data from DB

  res.jsonp(resp);
  
});

router.post('/', function(req, res) {

  var data = req.body;

  // here save the data in DB
  setTimeout(function(){
    res.jsonp({user : data.name, plate : data.plate, saved : true});
  }, 500);
});

router.put('/:id', function(req, res) {

  var data = req.body,
      ndx = searchUser(req.params.id);

  if(ndx !== false) {
    // here id the DB consult to get the users
    users[ndx].name = data.name;
    users[ndx].plate = data.plate;
    users[ndx].type = data.type;
  }

  console.log(ndx, data, users[ndx]);
  // here save de data in DB
  setTimeout(function(){
    res.jsonp(users);
  }, 500);
});


module.exports = router;
