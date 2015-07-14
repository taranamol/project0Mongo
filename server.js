// require express framework and additional modules
var express = require('express'),
app = express(),
bodyParser = require('body-parser'),
_ = require("underscore");

// tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));

//connecting the css/js to the server.js
app.use(express.static(__dirname + '/public'));

var mongoose = require('mongoose');
//connecting the other file (postModel.js)
var Post = require('./models/postModel');
//connect to db
mongoose.connect('mongodb://localhost/microBlog');

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

//the below are API routes

//this is finding all the posts in the server
app.get('/posts', function (req, res) {
  Post.find(function (err, posts) {
    res.json(posts);
  });
});

//new is creating new instances of this object
//save will actually save it into the database
app.post('/posts', function (req, res) {
  var newPost = new Post ({
    title: req.body.title,
    description: req.body.description
  });
  newPost.save(function (err, savedPost) {
    res.json(savedPost);
  });
});

//updated the instance of the id of the object
app.put('/posts/:id', function (req, res) {
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
app.delete('/posts/:id', function (req, res) {
  var targetId = req.params.id;
  Post.findOneAndRemove({_id: targetId}, function (err, deletedPost) {
    res.json(deletedPost);
  });
});

app.listen(3000, function () {
  console.log('server started on locahost:3000');
});


