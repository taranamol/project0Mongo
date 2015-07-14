 mongoose = require('mongoose');
  var Schema = mongoose.Schema; //schema sets up what the data looks like

var PostSchema = new Schema({
  title: String,
  description: String,
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;