// js to randomly display 'news' landing image. 
// Author: Ben Deibert, 
// Credit:  http://codepen.io/grayghostvisuals/pen/KokDB

function randomImages() {
	var pics = ['/dev/img/indexImgs/frisbee.jpg', '/dev/img/indexImgs/group.jpg', '/dev/img/indexImgs/meteor.jpg', 
	'/dev/img/indexImgs/prayer.jpg', '/dev/img/indexImgs/rifle.jpg', '/dev/img/indexImgs/boating.jpg', 
	'/dev/img/indexImg/flyFishing.jpg' ];
	
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