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


  db.tag.find({where: {id:1},include:[db.favorite]}).then(function(tag){
    db.favorite.findAll().then(function(favorite){
      console.log(tag.favorites);
    })
  })

router.get('/index', function(req, res) {
  // res.send(tagId)
  var tagId = req.query.tagId;
  if (tagId) {
      db.tag.find({
        where: {id:tagId},
        include: [db.favorite]
      }).then(function(tag){
        db.favorite.findAll({include:[db.comment,db.tag]}).then(function(favorite){
          res.render('favorites/index', {
          favoriteMovies: tag.favorites,
          pageName: "favorites"
        });
    });
      });
  } else {
    db.favorite.findAll({
      include:[db.comment,db.tag]}).then(function(favorites){
          res.render('favorites/index', {
          favoriteMovies: favorites,
          // tagId: tagId,
          pageName: "favorites"
      });
    });
  }
})

router.get('/:id/comments', function(req, res) {

  // better way:
  db.favorite.find({
    where: {id:req.params.id},
    include: [db.comment]
  }).then(function(movie){
      res.render('favorites/comments', {
        allComments: movie.comments,
        movie: movie,
        prevPage: req.headers['referer'],
        pageName: "comments"
      });

  // var movieId = req.params.id;
  // db.comment.findAll({where: {favoriteId: movieId}}).then(function(comments){
  //   db.favorite.findById(movieId).then(function(movie){
  //     res.render('favorites/comments', {
  //       allComments: comments,
  //       movie: movie,
  //       prevPage: req.headers['referer'],
  //       pageName: "comments"
  //     });
  //   });

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

// POST /favorites/:id
router.delete('/:id', function(req,res){
  // res.send('delete it!')
  db.favorite.destroy({where:{id:req.params.id}}).then(function() {
    res.redirect('/favorites/index');
  })
})

router.get('/:id/tags/new', function(req, res){
  var favId = req.params.id;
  res.render('tags/new', {
    pageName: 'newTag',
    favId: favId
  });
});

router.post('/:id/tags', function(req,res){
  // res.send(req.body.word)
  var favId = req.params.id;
  db.favorite.find({where: {id:favId}}).then(function(favorite){
    db.tag.findOrCreate({where: {word: req.body.word}}).spread(function(tag, create){
      favorite.addTag(tag).then(function(){
        res.redirect('/favorites/index')
      })
    })
})
});

router.get('/tags', function(req, res) {
  db.tag.findAll({include: [db.favorite]}).then(function(tags){
    res.render('tags/index', {
      pageName: 'allTags',
      tags: tags
    });
  })
})

// router.get('/tags/:id/show', function(req, res) {
//   db.tag.findById(req.params.id, {include: [db.favorite]}).then(function(tag){
//     res.render('tags/show', {
//       pageName: 'tagsMovies',
//       tag: tag
//     });
//   })
// })

module.exports = router;