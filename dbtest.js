var db = require('./models');

// FIND ONE AUTHOR
// db.favorite.find({where:{name: 'Brian'}}).then(function(favorite){
//   console.log(favorite.get());
// });

// LIST ALL AUTHORS
// db.favorite.findAll().then(function(favorites){
//   // console.log(favorites.length);
//   favorites.forEach(function(favorite){
//     console.log(favorite.get());
//     console.log('------');
//   });
// });

// CREATE ONE POST that belongs to favorite
// db.favorite.find({where:{name: 'Brian'}}).then(function(favorite){
//   favorite.createPost({
//     title: "My Second Post",
//     content: "Second comment content."
//    }).then(function(comment) {
//     console.log(comment.get());
//    })
//   console.log(favorite.get());
// });


// db.favorite.find({where:{name: 'Brian'}}).then(function(favorite){
//   console.log(favorite.get());
//   favorite.getPosts().then(function(comments){
//     console.log('comment count ', comments.length);
//     comments.forEach(function(comment) {
//       console.log('-------');
//       console.log(comment.get());
//     })
//   });
// });

// LOAD ALL POSTS (get comments)
// db.favorite.findAll().then(function(favorites){
//   // console.log(favorites.length);
//   favorites.forEach(function(favorite){
//     favorite.getPosts().then(function(comments){
//       console.log(favorite.get());
//       console.log('comment count', comments.length)
//       console.log('------');
//     });
//   });
//   console.log('all done??');
// });

// ...
// db.favorite.findAll({
//   include:[db.comment]
// }).then(function(favorites){
//   // console.log(favorites.length);
//   favorites.forEach(function(favorite){
//     var cleanFavorite = favorite.get();
//     cleanFavorite.comments = cleanFavorite.comments.map(function(comment) {
//       return comment.get();
//     });
//     console.log(favorite.get());
//   });
//   console.log('all done??');
// });


// WRONG
// db.favorite.find().then(function(favorite){
//   db.favorite.comments.findAll().then(function(comment){
//     console.log(comment);
//   });
// });

// db.favorite.find().then(function(favorite){
  // favorite.createComment({
  //   body:'this is a test comment'
  // }).then(function(comment){
  //   console.log(comment);
  // });
//   favorite.getComments().then(function(comments){
//     console.log(comments)
//   });
// });

// db.favorite.find({where: {id:6}}).then(function(favorite){
//   db.tag.findOrCreate({where: {word:"action"}}).spread(function(tag, create){
//     favorite.addTag(tag).then(function(){
//       console.log("tag: " + tag.word + "; favorite: " + favorite.title)
//     })
//   })
// })


//   db.tag.find({where: {id:1},include:[db.favorite]}).then(function(tag){
//     db.favorite.findAll({include:[db.comment,db.tag]}).then(function(favorite){
//       console.log(tag.favorites);
//       // console.log(tag.favorites[0].tags)
//     })
// })

db.favorite.findAll({include:[db.comment,db.tag]}).then(function(favorite){
  db.tag.find({where: {id:1},include:[db.favorite]}).then(function(tag){
    // console.log(tag.favorites);
    console.log(tag.favorites[0].tags)
  })
})



