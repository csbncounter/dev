// js to randomly display 'news' landing image. 

function randomImages() {
	var pics = ['/dev/img/indexImgs/frisbee.jpg', '/dev/img/indexImgs/group.jpg', '/dev/img/indexImgs/meteor.jpg', 
	'/dev/img/indexImgs/prayer.jpg', '/dev/img/indexImgs/rifle.jpg' ];
	
	$('header').css({'background' : 'url('+pics[Math.floor(Math.random() * pics.length)] + ') no-repeat', 
		'background-attachment' : 'scroll',
		'background-position' : 'center center',
    'background-repeat' : 'none',
    '-webkit-background-size' : 'cover',
    '-moz-background-size' : 'cover',
    'background-size' : 'cover',
    '-o-background-size' : 'cover',
    'background-attachment' : 'fixed',
    });
}// end script

//show random Image on Page Load
randomImages(); 