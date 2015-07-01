var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var db = require('monk')(process.env.MONGOLAB_URI);
var players = db.get('players');



////GET HOME PAGE
router.get('/', function(req, res, next) {
  var player = req.cookies.user || ""
  res.render('index', {player: player});
});

router.get('/login', function(req,res,next){
  res.render('index')
})

////LOGIN POST
router.post('/login', function(req,res,next){
  var playerName = req.body.user_name.toUpperCase();
  var playerPw = req.body.password;
    if(playerPw== null){
      res.render('index', {error: "Invalid Credentials", errMsg: 'Please Try Again'})
    }
    players.findOne({name: playerName}, function(err,data){
      bcrypt.compare(playerPw.toUpperCase(), data.password , function(err, answer) {
        if (answer === true){
          res.cookie('player', playerName);
          res.redirect('/roulette/table');
        } else {
          res.render('index', {error: "Invalid Credentials", errMsg: 'Please Try Again'})
      }
    });
  });
});



////SIGN UP PAGE
router.get('/sign_up', function(req,res,next){
  res.render('sign_up');
})



///SIGN UP
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
      players.insert({name: req.body.user_name.toUpperCase(), password: hash})
      res.redirect('/')
    }
});


////GET THE ROULETTE PAGE
router.get('/roulette/table',function(req,res,next){
  var user = req.cookies.player;
  console.log(user);
  res.render('roulette/table', {user: user})
})







router.get('/roulette/account', function(req,res,next){
  var user = req.cookies.player
  res.render('roulette/account', {user: user})
})

router.post('/signout', function(req,res,next){
  res.clearCookie('player');
res.redirect('/')
});







module.exports = router;
