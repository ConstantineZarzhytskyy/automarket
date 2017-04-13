var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var automarket = new Schema({
  name: { type: String, default: '' },
  description: { type: String, default: '' }
});

var auto = new Schema({
  name: { type: String, default: '' },
  description: { type: String, default: '' }
});

var personal = new Schema({
  name: { type: String, default: '' },
  description: { type: String, default: '' }
});

module.exports.automarket = mongoose.model('automarket', automarket);
module.exports.auto = mongoose.model('auto', auto);
module.exports.personal = mongoose.model('personal', personal);
