var db = require('../models');
var express = require('express');
var router = express.Router();

router.get('/new', function(req,res){
  res.render('users/new', {pageName: "users"});
});

router.post('/', function(req,res){
  if (req.body.password != req.body.password2) {
    res.send("Passwords must match!")
  } else {
  db.user.findOrCreate({
    where: {email: req.body.email},
    defaults: {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name
    }
    }).spread(function(user, created){
      if (created) {
        res.redirect('/');
      } else {
        res.send('a user with that email already exists');
      }
    }).catch(function(err){
      res.send(err);
    });
  }
});



module.exports = router;