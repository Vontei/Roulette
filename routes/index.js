var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var db = require('monk')(process.env.MONGOLAB_URI);
var players = db.get('players');


router.get('/', function(req, res, next) {
  var player = req.cookies.user || "";
  res.render('index', {player: player});
});


router.post('/login', function(req,res,next){
  var playerName = req.body.user_name.toUpperCase();
  var playerPw = req.body.password;
  players.findOne({name: playerName}, function(err,data){
    if (data == null){
      res.render('index', {error: "Invalid Credentials", errMsg: 'Please Try Again'})
    }
    else {
      bcrypt.compare(playerPw.toUpperCase(), data.password , function(err, answer) {
        if (answer === true){
          res.cookie('player', playerName);
          res.redirect('/roulette/table');
        }
        else {
          res.render('index', {error: "Invalid Credentials", errMsg: 'Please Try Again'})
        }
      });
    }
  });
});


router.get('/sign_up', function(req,res,next){
  res.render('sign_up');
});


router.post('/sign_up', function(req,res,next){
  var password = req.body.password;
  var confirmation = req.body.passconf;
  var userName = req.body.user_name;
  var error = '';
    if (userName.length < 4){
      error="Your user name must be at least 4 characters long.";
      res.render('sign_up', {error: error})
    }
    if (password.length < 4) {
      error="Password must be longer than 4 characters.";
      res.render('sign_up', {error: error});
    }
    if ((password || confirmation) === null) {
      error="You must enter a password and confirm it. ";
      res.render('sign_up', {error: error});
    }
    if (password != confirmation) {
      error="Your passwords do not match!";
      res.render('sign_up', {error: error});
    }
    if (userName===null){
      error="You must enter a valid user name.";
      res.render('sign_up', {error: error})
    }
    if (userName.length < 4){
      error="Your user name must be at least 4 characters long.";
      res.render('sign_up', {error: error})
    }
    if(password===confirmation){
      var hash = bcrypt.hashSync(password.toUpperCase(), 8);
      players.insert({name: req.body.user_name.toUpperCase(), password: hash, balance: '1000'})
      res.redirect('/')
    }
});


router.get('/roulette/table',function(req,res,next){
  var user = req.cookies.player;
  players.findOne({name: user}, function(err,data){
  res.render('roulette/table', {user: user, account: data.balance})
});
});


router.get('/roulette/account', function(req,res,next){
  var user = req.cookies.player
  res.render('roulette/account', {user: user})
});


router.post('/signout', function(req,res,next){
  res.clearCookie('player');
  res.redirect('/')
});


router.get('/casino/players', function(req,res,next){
  players.findOne({name: req.cookies.player}, function(err,data){
    console.log(data)
    res.send(data.balance)
  })
})

router.post('/casino/players', function(req,res,next){
  players.update({name: req.cookies.player},{$set: {balance: req.body.money}})
  res.send(null)
})



module.exports = router;
