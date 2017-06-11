var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var automarket = new Schema({
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  personal: { type: Array },
  auto: { type: Array }
});

var auto = new Schema({
  automarketId: Schema.Types.ObjectId,
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  color: { type: String, default: '#fff' },
  shares: { type: Array },
  price: { type: Number },
  buy: { type: String },
  type: { type: String },
  buyPrice: { type: Number }
});

var personal = new Schema({
  automarketId: Schema.Types.ObjectId,
  name: { type: String, default: '' },
  description: { type: String, default: '' }
});

var shares = new Schema({
  autoId: Schema.Types.ObjectId,
  name: { type: String, default: '' },
  percentage: { type: Number, default: 5 },
  start: { type: String },
  end: { type: String }
});

module.exports.automarket = mongoose.model('automarket', automarket);
module.exports.auto = mongoose.model('auto', auto);
module.exports.personal = mongoose.model('personal', personal);
module.exports.shares = mongoose.model('shares', shares);
