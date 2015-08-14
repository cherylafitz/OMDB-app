
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
require('express-helpers')(app);

// process.env.MY_API_KEY


var moviesController = require("./controllers/movies");
var favoritesController = require("./controllers/favorites");
var usersController = require("./controllers/users")

var app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: 'some secret key',
  resave: false,
  saveUninitialized: true
}));
app.use(express.static(__dirname + '/public'));
app.use(ejsLayouts);
app.use(methodOverride('_method'));

app.use("/movies", moviesController);
app.use("/favorites", favoritesController);
app.use("/users", usersController);

// app.use(session({secret: 'ssshhhhh'}));


// this doesn't work be of :id being passed in here
// app.use("/favorites/:id/comments", require('./controllers/comments.js'));

var sess;

app.get("/", function(req, res) {
  sess=req.session;
  res.render('main/index', {pageName: "home"});
})


app.listen(3000);
