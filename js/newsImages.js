// js to randomly display 'news' landing image. 

function randomImages() {
	var pics = ['/img/indexImgs/frisbee.jpg', '/img/indexImgs/group.jpg', '/img/indexImgs/meteor.jpg', '/img/indexImgs/prayer.jpg', '/img/indexImgs/rifle.jpg' ];
	
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