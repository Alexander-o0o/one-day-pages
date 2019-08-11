$(document).ready(function() {
	// toggle menu button
	$(".toggle-menu-button").on('click', function() {
		$(this).toggleClass("toggle-on");
		$(".togle-menu").toggleClass("toggle-on");
	});

	$('.carousel').slick({
		arrows: false,
		// autoplay: true,
		// autoplaySpeed: 2000,
		dots: true,
		speed: 1000
	});
});