var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');


router.get("/results", function(req, res) {
  var q = req.query.t;
  var url = 'http://www.omdbapi.com/?s=' + q;
  // var searchResults = [];
  if (q) {
  request(url, function(error, response, data) {
    var parsedData = JSON.parse(data);
    var results = parsedData.Search;
    // searchResults.push(results);
    // res.redirect("movies/results", results)
    if (results) {
    res.render("movies/results", {
      myResults : results,
      searchTerm: q,
      prevPage: req.headers['referer'],
      pageName: "results"
    })
    }
    else {
      res.render("movies/results", {message: "Sorry, no results available.",
    prevPage: req.headers['referer']})
    }
  });
  }
});

router.get("/:id", function(req, res)  {
  var id = req.params.id;
  var url = 'http://www.omdbapi.com/?i=' + id + '&tomatoes=true';
  request(url, function(error, response, data) {
    var parsedData = JSON.parse(data);
    var results = parsedData;
    db.favorite.find({where: {imdbId:id}}).then(function(favorite) {
      res.render("movies/show", {
        movie : parsedData,
        imbdId: id,
        prevPage: req.headers['referer'],
        pageName: "showMovie",
        favorite: favorite
      });
    });
    // res.send(parsedData)
  });
});



module.exports = router;