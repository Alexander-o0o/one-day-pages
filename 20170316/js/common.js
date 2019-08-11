$(document).ready(function() {
	// toggle menu button
	$(".toggle-menu-button").on('click', function() {
		$(this).toggleClass("toggle-on");
		$(".togle-menu").toggleClass("toggle-on");
	});

	function slick_play(slider) {
		slider.slick("slickPlay");
	};

	function get_rundom(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	};

	var sliders = new Array(8);
	for (i = 0; i < 8; i++) {
		sliders[i] = $(".works li:nth-child(" + (i + 1) + ") .carousel");
		sliders[i].slick({
			arrows: false,
			autoplay: true,
			autoplaySpeed: 5000,
			fade: true,
			// pauseOnFocus: false,
			// pauseOnHover: false,
			speed: 1500
		}).slick("slickPause");

		setTimeout(slick_play,  get_rundom(100, 10000), sliders[i]);
	}
	
	var focused_input = $(".contact-form input");
	$(".contact-form input").on("focusout", function () {
		focused_input.prev().css("border-right-color", "#aaa");
		focused_input.prev().css("color", "#aaa");
	});
	
	$(".contact-form input").on("focus", function () {
		focused_input = $(".contact-form input:focus");
		focused_input.prev().css("border-right-color", "#e01837");
		focused_input.prev().css("color", "#e01837");
	});
	

});