// js to assist in smoothly scrolling through internal page hrefs
// Author: Ben Deibert
// Credit: https://css-tricks.com/snippets/jquery/smooth-scrolling/

// both the target and button need to have rel="relativeanchor" before it will work... 
//Cited: http://jsfiddle.net/francescov/4DcNH/
$(document).ready(function() {
	$('a[rel="relativeanchor"]').click(function(){
	    $('html, body').animate({
	        scrollTop: $( $.attr(this, 'href') ).offset().top
	    }, 800);
	    return false;
	}); 
});
