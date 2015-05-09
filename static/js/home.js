(function(exports,$){
	
	var windowWidth = $(window).width();
	var currentSlide = 1;

	var  init = function(){
		
	};

	var bindEvents = function(){
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
		//resize event
		$(window).resize(function(){
			windowWidth = $(window).width();
			//resize image
			initSliderImage();
			//recalculate margin
			$('.slider-wrapper').css({"margin-left":-windowWidth*currentSlide+"px"},1000);
		});
	};

	var initSlider = function(){
		//insert first and last item
		var first = $('.slider-item:first-child');
		$('.slider-wrapper').append(first.clone());
		//init image
		initSliderImage();
		//set auto slide
		setInterval(setAutoSlide, 5000);
	};

	var initSliderImage = function(){
		//set slider wrapper width
		$('.slider-wrapper').width(windowWidth*($('.slider-item').length+2));
		//set slider-item width
		$('.slider-item').width(windowWidth);
		//set slider height
		var currentNode = $('.slider-item')[currentSlide-1];
		$('.slider').height($(currentNode).height());
	}

	var setAutoSlide = function(){
		var currentNode = $('.slider-item')[currentSlide];
		if(currentSlide== $('.slider-item').length){
			currentSlide = 1;
			$('.slider-wrapper').animate({"margin-left":"0px"},0);
		}else{
			var next = $(currentNode).next();
		}
		$('.slider-wrapper').animate({"margin-left":-windowWidth*currentSlide+"px"},1000);
		currentSlide++;
		initSliderImage();
	};

	$(function(){
		init();
		bindEvents();
	});

	window.onload = function(){
		initSlider();
	};
}(window,jQuery))