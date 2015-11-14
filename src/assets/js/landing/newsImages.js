(function ($, ncounter) {

  ncounter.setRandomBgImage = function (containerSelector) {
    var imageUrls = [
      '/assets/img/landing/frisbee.jpg',
      '/assets/img/landing/group.jpg',
      '/assets/img/landing/meteor.jpg',
      '/assets/img/landing/prayer.jpg',
      '/assets/img/landing/rifle.jpg',
      '/assets/img/landing/boating.jpg',
      '/assets/img/landing/flyFishing.jpg'
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
