var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Rest = require('../models/rest.js');
var hits = "4";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/apitest/:id', function(req, res) {
  res.send({"userid":req.params.id,
			"hits": hits});
});


module.exports = router;
