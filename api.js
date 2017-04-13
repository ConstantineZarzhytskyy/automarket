var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var localdb = 'mongodb://localhost/automarket';
var db = require('./db/db.js');

connectToDataBase();
function connectToDataBase() {
  return mongoose.connect(localdb);
}

router.get('/automarket', function (req, res) {
  db.automarket.find({}, function (err, automarkets) {
    if (err) { return req.send(err); }

    res.json(automarkets);
  })
});

router.post('/automarket', function (req, res) {
  var automarket = req.body.automarket;
  var newAutomarket = new db.automarket();

  newAutomarket.name = automarket.name;
  newAutomarket.description = automarket.description;

  newAutomarket.save(function (err, automarket) {
    if (err) { return res.send(err); }

    res.json(automarket);
  });
});

router.delete('/automarket/:id', function (req, res) {
  var id = req.params.id;
  db.automarket.remove({ _id: id }, function (err) {
    if (err) { return req.send(err); }

    res.end();
  })
});

module.exports = router;
