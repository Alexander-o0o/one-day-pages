$(document).ready(function() {
  $('.carousel').slick({
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    fade: true,
    speed: 2500
  });

  $(".box").on({
    mouseenter: function () {
      $(".box").not(this).css( "opacity", "0.5");
    },
    mouseleave: function () {
      $(".box").not(this).css( "opacity", "1");
    }
  });

  $(".box-6").mouseenter( function () {
    $(".box-content-video").css( "opacity", "1");
  });

});