var express = require('express');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var router = express.Router();

var mongoose = require('mongoose');
var Rest = require('../models/rest.js');

//GET REQUEST find all
router.get('/',function (req,res,next){
	Rest.find(function (err,users){
		if(err)return next(err);
		res.json(users);
	});
});

//Post Request
router.post('/create',function (req,res,next){
	//creat object with post params
	var hash = bcrypt.hashSync(req.body.password,salt);
	var ob = new Rest({
		first: req.body.first,
		last: req.body.last,
		username: req.body.username,
		password: hash
	});
	ob.save(function (err, post){
		if(err)return next(err);
		res.json(post);
	});
});

//GET request find by id
// router.get('/:id', function (req, res, next) {
// 	//gets the id in the url
// 	Rest.findById(req.params.id, function (err, post) {
// 		if (err) return next(err);
// 		res.json(post);
// 	});
// });


//Post REQ updateing
router.put('/:id', function (req, res, next) {
  Rest.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    // res.json(post);
    res.send('Updated');
  });
});


router.post('/checkhash',function (req,res,next){
	// returns the passed in password from the post request
	// console.log(req.body.password);
	Rest.findOne({'username':req.body.username},'username password',function(err,rest){
		if (err) return next(err);
		if (bcrypt.compareSync(req.body.password, rest.password)){
			res.json(rest);
		}else{
			res.status(500).send('Wrong password');
		}

	});

});

module.exports = router;
