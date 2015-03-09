var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var usersSchema = new Schema({
  name: {type: String},
  plate: {type: String},
  type: {type: String},
  email: {type: String},
  pwd: {type: String},
  role: {type: Number},
  active: {type: Boolean},
  visible: {type: Boolean}
});

module.exports = mongoose.model('vpusers', usersSchema);