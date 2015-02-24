var express = require('express');
var router = express.Router();

// Hardcoded info for know, will be serve by db when defined.
var users = [
  { name : "Dale", plate : "KEY 285", type : "car", active : true },
  { name : "Scrooge", plate : "MOE 231", type : "motorcycle", active : false },
  { name : "Mickey", plate : "MOE 613", type : "car", active : true },
  { name : "Donal", plate : "XWQ 673", type : "motorcycle", active : true },
  { name : "Goofy", plate : "QED 864", type : "car", active : true },
  { name : "Minnie", plate : "VCX 123", type : "car", active : true },
  { name : "Daffy", plate : "IHG 422", type : "car", active : false },
  { name : "Pluto", plate : "UJB 664", type : "car", active : true },
  { name : "Chip", plate : "FDF 814", type : "motorcycle", active : true },
  { name : "John", plate : "CAF 253", type : "motorcycle", active : true }
];

var normalizePlate = function(plate) {
  return plate.match(/[A-Za-z0-9]/gi).join('').toUpperCase();  
};

/* GET home page. */
router.get('/', function(req, res) {

  // here get the data from DB
  setTimeout(function(){
    res.jsonp(users);
  }, 5000);
  
});

router.post('/', function(req, res) {

  var data = req.body;

  // here save the data in DB
  setTimeout(function(){
    res.jsonp({user : data.name, plate : data.plate, saved : true});
  }, 5000);
});

router.put('/', function(req, res) {

  var data = req.body,
      rPlate = normalizePlate(data.plate);


  // here id the DB consult to get the users


  users.forEach(function(item, ndx) {
    var plate = normalizePlate(item.plate);

    if(plate === rPlate) {
      users[ndx].name = data.name;
      users[ndx].plate = rPlate;
      users[ndx].type = data.type;
    };
    console.log(item);
  });

  // here save de data in DB
  setTimeout(function(){
    res.jsonp({user : data.name, plate : rPlate, saved : true});
  }, 5000);
});


module.exports = router;
