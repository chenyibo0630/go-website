(function(exports,$){

	var images;
	var hammer;
	var mouses = new Array();
	var canvas;
	var ctx;
	var duration = 1;
	var score = 0;
	var escaped = 0;
	var createMouseInterval;
	var drawCanvasInterval;
	var addSpeedInterval;

	var init = function(){
		//init images
		var imageMap = [{
			name:"hammer",
			src:"/static/images/hammer.png"
		},{
			name:"mouse",
			src:"/static/images/mouse.png"
		}];
		initImages(imageMap);
		//init hammer
		hammer = new Hammer();
		//init canvas
		canvas = $('.pokeMole-inner').get(0);
		canvas.height = $('.pokeMole-inner').height();
		canvas.width = $('.pokeMole-inner').width();
		ctx = canvas.getContext("2d");
	};


	var bindEvents = function(){
		$('.pokeMole-inner')
		.mousemove(function(event){
			//draw hammer
			hammer.x = event.offsetX;
			hammer.y = event.offsetY;
			hammer.draw();
		})
		.mouseover(function(){
			this.style.cursor='none';
		})
		.mouseout(function(){
			this.style.cursor='';
		})
		.on("click",function(){
			for(var i in mouses){
				mouses[i].checkHit();
			}
		});	
		//create mouse
		createMouseInterval = setInterval(function(){
			//init mouse
			mouse = new Mouse();
			mouse.x = (canvas.width-260)*Math.random()+130;
			mouse.y = (canvas.height-200)*Math.random()+100;
			mouse.duration = duration;
			mouses.push(mouse);
		},1000);
		//draw interval
		drawCanvasInterval = setInterval(function(){
		    drawCanvas();
		}, 20);
		//add speed
		addSpeedInterval = setInterval(function(){
			if(duration<7){
				duration++;
			}else{
				window.clearInterval(addSpeedInterval);
			}
		}, 5000);
	};

	var initImages = function(imageMap){
		images = new Array();
		for(var i=0;i<imageMap.length;i++){
			//create image dom based on src
			var imgObj = imageMap[i];
			var imgDom = new Image();
			imgDom.src = imgObj.src;
			images[imgObj.name] = imgDom;
		}
	};

	var drawCanvas = function(){
		//clear
		ctx.clearRect ( 0 , 0 , canvas.width,canvas.height );
		for(var i in mouses){
			mouses[i].draw();
		}
		hammer.draw();
	};

	var addScore = function(){
		score += 10*duration;
		$('.score').html("score:"+score);
	};

	var addEscaped = function(){
		escaped ++;
		$('.escaped').html("escaped:"+escaped);
		if(escaped==10){
			alert("game over");
			gameOver();
		}
	};

	var gameOver = function(){
		window.clearInterval(createMouseInterval);
		window.clearInterval(drawCanvasInterval);
		window.clearInterval(addSpeedInterval);
		$('.pokeMole-inner').unbind("mousemove");
		$('.pokeMole-inner').unbind("mouseout");
		$('.pokeMole-inner').unbind("mouseover");
		$('.pokeMole-inner').css("cursor","");
		ctx.clearRect ( 0 , 0 , canvas.width,canvas.height );
	};

	//hammer class
	var Hammer = function(){
	 	this.x=0;
		this.y=0;
		this.width = 98;
		this.height = 77;
	};

	Hammer.prototype.draw = function(){
		var img = images['hammer'];
		if (img.complete) {
	        ctx.drawImage(img, this.x-this.width/2,this.y-this.height/2,this.width,this.height); 
	        return;
	     }  
	     img.onload = function () {  
	         ctx.drawImage(img, this.x-this.width/2,this.y-this.height/2,this.width,this.height); 
	     };  
	};

	var Mouse = function(){
		this.x = 0;
		this.y = 200;
		this.width = 130;
		this.height = 0;
		this.imageX = 285;
		this.imageY = 125;
		this.index = 0;
		this.duration = 1;
		//0 => show, 1 => hide, 2 => canceled
		this.status = 0;
		this.hit = false;
	}

	Mouse.prototype.draw = function(){
		if(this.status == 0){
			this.y -= this.duration;
			this.height += this.duration;
			if(this.height>100){
				this.status = 1;
			}
		}else if(this.status == 1){
			this.y += this.duration;
			this.height -= this.duration;
			if(this.height<0){
				this.status = 2;
				if(!this.hit){
					addEscaped();
				}
				//delete mouse
				var last = mouses.shift();
			}
		}else{
			return;
		}
		
		var img = images['mouse'];
		if (img.complete) {
	        ctx.drawImage(img,this.imageX,this.imageY,this.width,this.height,this.x,this.y,this.width,this.height); 
	        return;
	     }  
	     img.onload = function () {  
	         ctx.drawImage(img,this.imageX,this.imageY,this.width,this.height,this.x,this.y,this.width,this.height); 
	     };  
	};

	Mouse.prototype.checkHit = function(){
		if(this.hit){
			return;
		}
		if(hammer.y>this.y && hammer.y<this.y+this.height && hammer.x-hammer.width/2>this.x && hammer.x<this.x+this.width){
			this.hit = true;
			//change image
			this.imageX = 410;
			addScore();
		}
	};

	$(function(){
		init();
		bindEvents();
	});
	
}(window,jQuery))