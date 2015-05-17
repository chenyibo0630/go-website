
(function(exports,$){
	//scroll event
	var lastScrollTop = 0;
	$(window).scroll(function(event){
	   var st = $(this).scrollTop();
	   if (st > lastScrollTop){
	       // downscroll code
	       $('#header').addClass("scroll-down");
	   } else {
	      // upscroll code
	      $('#header').removeClass("scroll-down");
	   }
	   lastScrollTop = st;
	});
}(window,jQuery))