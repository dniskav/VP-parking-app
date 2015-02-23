var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  // Hardcoded info for know, will be serve by db when defined.
  var data = [
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
  res.send(data);
});

module.exports = router;
