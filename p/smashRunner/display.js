

const Display = function(canvas, container) {
  this.bc = "#80bfff";
  this.shadowedBc = "#1a8cff";
  this.fc = "#e6ffff";
  
  this.buffer  = document.createElement("canvas").getContext("2d"),
  this.context = canvas.getContext("2d");
  this.TO_RADIANS = Math.PI /180;

  this.drawRectangle = function(x, y, width =1, height=1,color = "#fff") {
    this.buffer.fillStyle = color;
    this.buffer.fillRect(x, y, width, height);
  };
  /*this.drawText = function(txt,x,y,font = "20px Fantasy Impact Times", ...args){
	if(font == null){ font = "20px Fantasy Impact Times"; }
	
	this.buffer.font = font;
	
	let color = "black";
	if(args.length > 1){ // create gradient
		color = this.buffer.createLinearGradient(0, 0, this.context.width, 0);
		for(var c of args){
			color.addColorStop(c[0],c[1]);
		}
	}
	else if (args.length == 1){
		color = args[0];
	}
	
	this.buffer.fillStyle = color;
	
	this.buffer.fillText(txt, x, y);
  };
  this.drawCircle = function(x, y, r, color = "#434", type = "fill"){  // do not use
	if(type == "fill") this.buffer.fill();
	else this.buffer.stroke();
	  
    this.buffer.fillStyle = color;
	
	this.buffer.arc(x,y,r, 0, 360 * this.TO_RADIANS);
  };*/
  this.update = function(width, height, player, lb,rb, scale = 1, bc = this.bc){
	  
	this.drawRectangle(0, 0,lb, height,bc);
	this.drawRectangle(rb, 0, width - rb, height,bc);
	
	let grass = 5 * scale;
	this.drawRectangle(lb - grass, 0, grass,height,bc);
	this.drawRectangle(rb, 0, grass, height,bc);
	
	let shadow = this.shadowedBc; // (this.bc - "#122").toString(16);
	this.drawRectangle(0, 0,5, height, shadow);
	this.drawRectangle(width - 5, 0,5, height, shadow);
	
	
	this.drawRectangle(player.x, player.y,player.w, player.h,bc);

  };
  this.drawObject = function(image, x,y,size){
	  try{ this.buffer.drawImage(image, x,y,size, size);}
	  catch(e){ console.log("image failed to load");}
  };
  this.drawPixelArt = function(image,x = 1,y = 1,w = 1,h = w,r = 0,dx = 0, dy = 0){// r in degrees
	this.buffer.translate(x,y);
	this.buffer.rotate(r * this.TO_RADIANS);
    this.buffer.drawImage(image,dx,dy,w,h);	
	this.buffer.rotate(-r * this.TO_RADIANS);
	this.buffer.translate(-x,-y);
  }
  
  this.drawCannon = function(image, x, y, size, r) {
	let rotation = 45-r;
	this.buffer.translate(x,y);
	this.buffer.rotate(rotation * this.TO_RADIANS);
    this.buffer.drawImage(image, -26,-37,size, size);
	this.buffer.rotate(-rotation * this.TO_RADIANS);
	this.buffer.translate(-x,-y);
  };
  
  
  
  this.resize = function(w, h, height_width_ratio) {
	let temp = document.getElementById("main");
	let sb = document.getElementById("sidebar");
	let l = sb.offsetWidth + 0;
	let width = window.innerWidth
		|| document.documentElement.clientWidth
		|| document.body.clientWidth;

	let height = window.innerHeight
		|| document.documentElement.clientHeight
		|| document.body.clientHeight;
	height = h - (document.getElementById("topbar").getAttribute("bottom") +81);
	width = w - (l + 26);
	
	temp.style.left = `${l}px`;
	  
    if (height / width > height_width_ratio) {
		this.context.canvas.height = width * height_width_ratio;
		this.context.canvas.width  = width;
    } else {
		this.context.canvas.height = height;
		this.context.canvas.width  = height / height_width_ratio;
    }
    this.context.imageSmoothingEnabled = false;// ****************too
  };
};

Display.prototype = {
  constructor : Display,
  render:function() {
	  this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height);
  },
  clear:function(w,h) {
	  this.context.clearRect(0,0,w,h);
	  this.drawRectangle(0,0, w,h,this.fc);
  }
};