(function ($, ncounter) {

  var IMAGE_URLS = [
    '/assets/img/landing/frisbee.jpg',
    '/assets/img/landing/group.jpg',
    '/assets/img/landing/meteor.jpg',
    '/assets/img/landing/prayer.jpg',
    '/assets/img/landing/rifle.jpg',
    '/assets/img/landing/boating.jpg',
    '/assets/img/landing/flyFishing.jpg'
  ];

  ncounter.home = {

    setRandomBgImage: function (containerSelector) {
      var imageUrlIndex = Math.floor(Math.random() * IMAGE_URLS.length);
      var randomImageUrl = IMAGE_URLS[imageUrlIndex];

      $(containerSelector).css({
        backgroundImage: 'url(' + randomImageUrl + ')', 
        backgroundPosition: 'center center',
        backgroundRepeat : 'none',
        backgroundSize : 'cover'
      });
    }
  }
})(window.$, window.ncounter ? window.ncounter : window.ncounter = {});
