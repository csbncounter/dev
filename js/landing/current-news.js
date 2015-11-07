(function ($, _, ncounter) {
  var monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];
  function prettyDate(rawDate) {
    if (!rawDate) { return ''; }
    var dateTime = new Date(Date.parse(rawDate));
    var month = monthNames[dateTime.getMonth()];
    var day = dateTime.getDate();
    var year = dateTime.getFullYear();
    return month + ' ' + day + ', ' + year;
  }

  function getTemplate(templateSelector) {
    return _.template($(templateSelector).html());
  }

  function fetchPosts() {
    return $.get('https://www.googleapis.com/blogger/v3/blogs/4421389846568223521/posts?orderBy=published&fields=items(published%2Curl%2Ctitle%2Ccontent)&key=AIzaSyCMVIWKm-FtKOiStNcVwEQYWvJF-1jfVkc')
      .then(function (response) {
        // Normalize content from blogger API
        var posts = _.map(response.items, function(post) {
          var content = post.content || '';
          // Default image
          var image = 'img/default-news-image.png';
          var imageSize = 'cover';
          var match;
          // If the blog post contains an image, use the first one
          if ((match = content.match(/<img[^>]+src="(.+?)"/))) {
            image = match[1];
            imageSize = 'contain';
          }
          post.image = image;
          post.imageSize = imageSize;
          post.published = prettyDate(post.published);
          delete post.content;

          return post;
        });

        return posts;
      });
  }

  function buildNewsItemsHtml(newsItemTpl, posts) {
    // Buffer the html for each news item into an array.
    var newsItemsFragments = [];
    for (var i = 0; i < posts.length; i++) {
      var post = posts[i];
      // Combine template and data into actual HTML
      var newsItemFragment = newsItemTpl(post);
      newsItemsFragments.push(newsItemFragment);
    }

    return newsItemsFragments.join('');
  }

  ncounter.fetchRenderNews = function(templateSelector, newsSelector) {
    var newsItemTpl = getTemplate(templateSelector);

    fetchPosts()
      .then(buildNewsItemsHtml.bind(null, newsItemTpl))
      .then(function (newsItemsHtml) {
        $(newsSelector).html(newsItemsHtml);
      });
  }
})(window.$, window._, window.ncounter ? window.ncounter : window.ncounter = {});
