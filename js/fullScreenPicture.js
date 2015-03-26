/*!
 * Code from Ian Stewart, (http://ianmstew.com)
 * purpose: track the size of the window and resize the image to match the window load.
 */

$(window).load(function () {
	$('.intro-text').css({
		height: $(window).height()
	});
});

$(window).resize(function () {
 		$('.intro-text').css({
   		height: $(window).height()
		});
});