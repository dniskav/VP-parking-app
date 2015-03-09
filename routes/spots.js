var express = require('express');
var router = express.Router();
var crud = require('../data/db');
var app = express();

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

  if(checkData(data)) {
    res.jsonp({error: "missing data"});
    return;
  }

  var newUser = new crud({
    name : data.name,
    plate : normalizePlate(data.plate),
    type : data.type.toLowerCase(),
    email: data.email,
    pwd: data.pwd,
    role: data.role || 15,
    active : data.active,
    visible: data.visible
  });

  // here save the data in DB
  newUser.save(function (err, resp) {
    if (err) {
      return res.status(status).send(500, err.message);
    };
    res.jsonp({user: newUser, saved : true});
  });
});

// check for empty data
var checkData = function (obj) {
  var res = false,
      iExclude = {};
  iExclude.items =[
    'active',
    'visible',
    'role'
  ];

  iExclude.iSearch = function (item) {
    var ndx = this.items.indexOf(item),
        resp = false;

    if (ndx > -1) {
      resp = this.items[item];
    }

    return resp;
  };

  for(var prop in obj) {
    var current = obj[prop];
    if(iExclude.iSearch(prop)) continue;
    if(current === "") {
      if (!res) {
        res = [];
      }
      res.push(prop);
    }
  };
  return res;
}

/* PUT by _id */
router.put('/:id', function (req, res) {
  var data = req.body,
      id = req.params.id;
  if (data.plate) {
    data.plate = normalizePlate(data.plate);
  }
  if (data.type) {
    data.plate = data.plate.toLowerCase();
  }

  if (id !== false && req.body) {
    crud.findById(id, function(err, user) {
      user.name = data.name || user.name;
      user.plate = data.plate || user.plate;
      user.type = data.type || user.type.toLowerCase();
      user.active = (typeof data.active != 'undefined')? data.active : user.active;
      user.visible = (typeof data.visible != 'undefined')? data.visible : user.visible,
      user.email = data.email || user.email,
      user.pwd = data.pwd || user.pwd,
      user.role = data.role || 15;

      user.save(function (err) {
        if (err) return res.status(status).send(500, err.message);
        res.jsonp({user: id, saved : true});
      });
    });
  } else {
    res.jsonp({error: "User not found"});
  };
});

/* DELETE by _id */
router.delete('/:id', function (req, res) {
  var data = req.body,
      id = req.params.id;

  crud.findById(id, function(err, user) {
    user.remove(err, function () {
      if (err) return res.send(500, err.message);
    });
    res.jsonp({user: id, deleted : true});        
  });
});

module.exports = router;
