var db = require('../models');
var express = require('express');
var router = express.Router();

router.post('/', function(req, res){
  db.favorite.findOrCreate({where: {
    imdbId: req.body.id,
    title: req.body.title,
    year: req.body.year,
    poster: req.body.poster
  }
  }).spread(function(favorite, created){
    res.redirect('/movies/' + req.body.id);
  })
});

router.get('/index', function(req, res) {
  db.favorite.findAll().then(function(favorites){
    favorites.forEach(function(favorite) {
      favorite.getComments().then(function(comments){
        res.send
        res.render('favorites/index', {
        favoriteMovies: favorites,
        comments: comments
        });
      });
    });
  });
})

router.get('/:id/comments', function(req, res) {
  var movieId = req.params.id;
  db.comment.findAll({where: {favoriteId: movieId}}).then(function(comments){
    db.favorite.findById(movieId).then(function(movie){
      res.render('favorites/comments', {
        allComments: comments,
        movie: movie,
        prevPage: req.headers['referer']
      });
    });
  });
});

router.post('/:id/comments', function(req,res){
  var movieId = req.params.id;
  var content = req.body.content;
  db.favorite.findById(req.params.id).then(function(movie){
    // res.send(movie);
    movie.createComment({content:content}).then(function(comment){
      res.redirect("/favorites/" + movieId + "/comments");
    })
  })
})


module.exports = router;