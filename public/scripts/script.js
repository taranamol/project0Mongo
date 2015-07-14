$(function() {

  var postsController = {

    //this is the template: connecting to the html 
    postTemplate: _.template($('#postTemplate').html()),

    all: function() {
      $.get('/posts', function(data) {
        var allPosts = data;
        _.each(allPosts, function(post) {
          //append the posts so they appear on the page
          var $postHtml = $(postsController.postTemplate(post));
          $('#listOfPosts').append($postHtml); //check this. example has ul?
          console.log(allPosts);
        });
        postsController.addEventHandlers();
      });
    },

    create: function(newTitle, newDescription) {
      var postData = {title: newTitle, description: newDescription};
    //request to server to create a new post
    $.post('/posts', postData, function(data) {
      //passing it through template to show on the page
      var $postHtml = $(postsController.postTemplate(data));
      $('#listOfPosts').append($postHtml);
    });
  },

  update: function(postId, updatedTitle, updatedDescription) {
    //updating the info
    $.ajax({
      type: 'PUT',
      url: '/posts/' + postId,
      data: {
        title: updatedTitle,
        description: updatedDescription
      },
      success: function(data) {
        var $postHtml = $(postsController.Posttemplate(data));
        $('#post-' + postId).replaceWith($postHtml);
      }
    });
  },

  delete: function(postId) {
    $.ajax({
      type: 'DELETE',
      url: '/posts/' + postId,
      success: function(data) {
        $('#post-' + postId).remove();
        }
      });
    },  
      
  addEventHandlers: function() {
    $('#listOfPosts')
      .on('submit', '.updatePost', function(event) {
        event.preventDefault();
        var postId = $(this).closest('.post').attr('data-id');
        postsController.delete(postId);
      });
  },

  setupView: function() {
    //exising phrases to screen
    postsController.all()

    $('#listOfPosts').on('submit', function(event) {
      event.preventDefault();
      var newTitle = $('#newTitle').val();
      var newDescription = $('newDescription').val();
      postsController.create(newTitle, newDescription);
    });
  }
};

});