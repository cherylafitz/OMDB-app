var db = require('../models');
var express = require('express');
var router = express.Router();


// get favorites/:id/comments
// router.get('/:id/comments', function(req, res) {

//   res.render('favorites/comments');
// });

// router.get('/:id/comments', function(req, res) {
//   var movieId = req.params.id;
//   db.comment.findAll({where: {favoriteId: movieId}}).then(function(comments){
//     db.favorite.findById(movieId).then(function(movie){
//       res.render('favorites/comments', {
//         allComments: comments,
//         movie: movie,
//         prevPage: req.headers['referer'],
//         pageName: "comments"
//       });
//     });
//   });
// });

// router.post('/:id/comments', function(req,res){
//   var movieId = req.params.id;
//   var content = req.body.content;
//   db.favorite.findById(req.params.id).then(function(movie){
//     // res.send(movie);
//     movie.createComment({content:content}).then(function(comment){
//       res.redirect("/favorites/" + movieId + "/comments");
//     })
//   })
// })




module.exports = router;