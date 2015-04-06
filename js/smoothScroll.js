// js to assist in smoothly scrolling through internal page hrefs
// Author: Ben Deibert
// Credit: https://css-tricks.com/snippets/jquery/smooth-scrolling/
/* This function also picks up the internal hrefs that the index -> protfolio section needs. 
Due to that, with this script, the internal hrefs 'pop up windows' didn't work. 
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});
*/

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