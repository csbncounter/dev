(function ($, ncounter) {

  ncounter.setRandomBgImage = function (containerSelector) {
    var imageUrls = [
      '/img/indexImgs/frisbee.jpg',
      '/img/indexImgs/group.jpg',
      '/img/indexImgs/meteor.jpg',
      '/img/indexImgs/prayer.jpg',
      '/img/indexImgs/rifle.jpg',
      '/img/indexImgs/boating.jpg',
      '/img/indexImgs/flyFishing.jpg'
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
