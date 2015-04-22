// js to randomly display 'news' landing image. 
// Author: Ben Deibert, 
// Credit:  http://codepen.io/grayghostvisuals/pen/KokDB

function randomImages() {
	var pics = ['/img/indexImgs/frisbee.jpg', '/img/indexImgs/group.jpg', '/img/indexImgs/meteor.jpg', 
	'/img/indexImgs/prayer.jpg', '/img/indexImgs/rifle.jpg', '/img/indexImgs/boating.jpg', 
	'/img/indexImgs/flyFishing.jpg'];
	
	$('header').css({'background' : 'url('+pics[Math.floor(Math.random() * pics.length)] + ') no-repeat', 
		'background-attachment' : 'scroll',
		'background-position' : 'center center',
    'background-repeat' : 'none',
    '-webkit-background-size' : 'cover',
    '-moz-background-size' : 'cover',
    'background-size' : 'cover',
    '-o-background-size' : 'cover',
    });
}// end script

//show random Image on Page Load
randomImages(); 