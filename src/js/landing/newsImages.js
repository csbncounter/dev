(function ($, ncounter) {

  ncounter.setRandomBgImage = function (containerSelector) {
    var imageUrls = [
      '/img/landing/frisbee.jpg',
      '/img/landing/group.jpg',
      '/img/landing/meteor.jpg',
      '/img/landing/prayer.jpg',
      '/img/landing/rifle.jpg',
      '/img/landing/boating.jpg',
      '/img/landing/flyFishing.jpg'
    ];

    var imageUrlIndex = Math.floor(Math.random() * imageUrls.length);
    var randomImageUrl = imageUrls[imageUrlIndex];
    
    $(containerSelector).css({
      backgroundImage: 'url(' + randomImageUrl + ')', 
      backgroundPosition: 'center center',
      backgroundRepeat : 'none',
      backgroundSize : 'cover'
    });
  }
})(window.$, window.ncounter ? window.ncounter : window.ncounter = {});
