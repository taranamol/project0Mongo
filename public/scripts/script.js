$(function() {

  var postsController = {

    //this is the template: connecting to the html 
    postTemplate: _.template($('#postTemplate').html());

    all: function() {
      $.get('/api/posts', function(data) {
        var allPosts = data;
        _.each(allPosts, function(post) {
          //append the posts so they appear on the page
          var $postHtml = $(postsController.template(post));
          $('#listOfPosts').append($postHtml); //check this. example has ul?
        });
        postsController.addEventHandlers();
      });
    },

    create: function(newTitle, newDescription) {
      var postData = {title: newTitle, description: newDescription};
    //request to server to create a new post
    $.post('/api/posts', postData, function(data) {
      //passing it through template to show on the page
      var $postHtml = $(postsController.template(data));
      $('#listOfPosts').append($postHtml);
    });
  },

  update: function(postId, updatedTitle, updatedDescription) {
    //updating the info
    $ajax({
      type: 'PUT',
      url: '/api/posts/' + postId,
      data {
        title: updatedTitle,
        description: updatedDescription
      },
      // success: function(data) {
      //   var $postHtml = $(postsController.template(data));
      //   $('#post-' + postId).replaceWith($postHtml);
      // }
    });
  },

  delete: function(postId) {
    $.ajax({
      type: 'DELETE'.
      url: '/api/posts/' + postId,
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
        var postsController.delete(postId);
      });
  },

  setupView: function() {
    //exising phrases to screen
    postsController.all()

    $('listOfPosts').on('submit', function(event) {
      event.preventDefault();
      var newTitle = $('#newTitle').val();
      var newDescription = $('newDescription').val();
      postsController.create(newTitle, newDescription);
    });
  }
};

});