// require express framework and additional modules
var express = require('express'),
app = express(),
bodyParser = require('body-parser'),
_ = require("underscore"),
mongoose = require('mongoose');

// tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/microBlog');
var Post = require('./models/postModel');

//connecting the css/js to the server.js
app.use(express.static(__dirname + '/public/styles'));
app.use(express.static(__dirname + '/public/scripts'));

app.use(bodyParser.json())

// var posts = [
//  {id: 1, title: "madrid, spain", description: "this restaurant was amazing! great vegetarian choices."},
//  {id:2, title: "lisbon, portugal", description: "great meal to start off our foodventures! never knew what sweet potatoes could be!"},
//  {id: 3, title: "florence, italy", description: "lovedd risotto! can't find it anywhere but italy!"}
//  ];

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

//this is finding all the posts in the server
app.get('/api/posts', function (req, res) {
  Post.find(function (err, posts) {
    res.json(posts);
  });
});

//new is creating new instances of this object
//save will actually save it into the database
app.post('/api/posts', function (req, res) {
  var newPost = new Post ({
    title: req.body.title,
    description: req.body.description
  });
  newPost.save(function (err, savedPost) {
    res.json(savedPost);
  });
});

//updated the instance of the id of the object
app.put('/api/posts/:id', function (req, res) {
  var targetId = req.params.id;
  Post.findOne({_id: targetId}, function (err, foundPost) {
    foundPost.title = req.body.title;
    foundPost.description = req.body.description;

    foundPost.save(function (err, savedPost) {
      res.json(savedPost);
    });
  });
});

// delete the post
app.delete('/api/posts/:id', function (req, res) {
  var targetId = req.params.id;
  Post.findOneAndRemove({_id: targetId}, function (err, deletedPost) {
    res.json(deletedPost);
  });
});

app.listen(3000, function () {
  console.log('server started on locahost:3000');
});


