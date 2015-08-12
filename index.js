var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
require('express-helpers')(app);
var moviesController = require("./controllers/movies");
var favoritesController = require("./controllers/favorites");

var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(ejsLayouts);
app.use(methodOverride('_method'));

app.use("/movies", moviesController);
app.use("/favorites", favoritesController);

// this doesn't work be of :id being passed in here
// app.use("/favorites/:id/comments", require('./controllers/comments.js'));


app.get("/", function(req, res) {
  res.render('main/index', {pageName: "home"});
})


app.listen(3000);
