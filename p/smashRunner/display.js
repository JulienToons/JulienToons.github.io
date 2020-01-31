

const Display = function(canvas, container) {

  this.buffer  = document.createElement("canvas").getContext("2d"),
  this.context = canvas.getContext("2d");
  this.TO_RADIANS = Math.PI /180;

  this.drawRectangle = function(x, y, color = null, width =1, height=1) {
	if (color == null){color = "#fff";};
    this.buffer.fillStyle = color;
    this.buffer.fillRect(x, y, width, height);

  };
  this.drawCircle = function(x, y, r, color = "#434", type = "fill"){  // do not use
	  if(type == "fill") this.buffer.fill();
	  else this.buffer.stroke();
	  
      this.buffer.fillStyle = color;
	
	  this.buffer.arc(x,y,r, 0, 360 * this.TO_RADIANS);
  };
  this.update = function(width, height, player, lb,rb){
	  
	this.drawRectangle(0, 0, "#fff",lb, height);
	this.drawRectangle(rb, 0, "#fff",width - rb, height);
	
	let grass = 5;
	this.drawRectangle(lb - grass, 0, "#fff", grass,height);
	this.drawRectangle(rb, 0, "#fff",grass, height);
	
	this.drawRectangle(0, 0, "#eee",5, height);
	this.drawRectangle(width - 5, 0, "#eee",5, height);
	
	
	this.drawRectangle(player.x, player.y, "#fff",player.w, player.h);

  };
  this.drawObject = function(image, x,y,size){
	  //this.drawRectangle(x,y);
	  //console.log(size);
	  try{ this.buffer.drawImage(image, x,y,size, size);}
	  catch(e){ console.log("image failed to load");}
  };
  
  this.drawCannon = function(image, x, y, size, r) {
	let rotation = 45-r;
	this.buffer.translate(x,y);
	this.buffer.rotate(rotation * this.TO_RADIANS);
    this.buffer.drawImage(image, -26,-37,size, size);
	//this.drawRectangle(0,0, "#00ff00", 5, 5);

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
	  this.drawRectangle(0,0, "#000", w,h);
  }
};