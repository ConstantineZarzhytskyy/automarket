var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var _= require('lodash');
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

router.get('/automarket/:id', function (req, res) {
  var id = req.params.id;
  db.automarket.findOne({ _id: id }, function (err, automarket) {
    if (err) { return req.send(err); }

    db.personal.find({ automarketId: automarket._id }, function (err, personal) {
      if (err) { return req.send(err); }

      db.auto.find({ automarketId: automarket._id }, function (err, auto) {
        if (err) { return req.send(err); }

        res.json(_.merge(automarket, { personal: personal, auto: auto }));
      });
    });
  })
});

router.delete('/automarket/:id', function (req, res) {
  var id = req.params.id;
  db.automarket.remove({ _id: id }, function (err) {
    if (err) { return req.send(err); }

    res.end();
  })
});

router.post('/member', function (req, res) {
  var personal = req.body.personal;
  var automarketId = req.body.automarketId;
  var newPersonal = new db.personal();

  newPersonal.name = personal.name;
  newPersonal.description = personal.description;
  newPersonal.automarketId = automarketId;

  newPersonal.save(function (err, member) {
    if (err) { return res.send(err); }

    res.json(member);
  });
});

router.post('/auto', function (req, res) {
  var auto = req.body.auto;
  var automarketId = req.body.automarketId;
  var newAuto = new db.auto();

  newAuto.name = auto.name;
  newAuto.description = auto.description;
  newAuto.color = auto.color;
  newAuto.price = auto.price;
  newAuto.automarketId = automarketId;

  newAuto.save(function (err, auto) {
    if (err) { return res.send(err); }

    res.json(auto);
  });
});

router.get('/auto/:autoId', function (req, res) {
  var autoId = req.params.autoId;

  db.auto.findOne({ _id: autoId }, function (err, auto) {
    if (err) { return req.send(err); }

    db.shares.find({ autoId: autoId }, function (err, shares) {
      if (err) { return req.send(err); }

      res.json(_.merge(auto, { shares: shares }));
    })
  });


});

router.post('/shares', function (req, res) {
  var shares = req.body.shares;
  var autoId = req.body.autoId;
  var newShares = new db.shares();

  newShares.name = shares.name;
  newShares.start = shares.start;
  newShares.end = shares.end;
  newShares.percentage = shares.percentage;
  newShares.autoId = autoId;

  newShares.save(function (err, shares) {
    if (err) { return res.send(err); }

    res.json(shares);
  });
});

module.exports = router;
