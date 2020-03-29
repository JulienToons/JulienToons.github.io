

const Display = function(canvas, container) {

  this.buffer  = document.createElement("canvas").getContext("2d"),
  this.context = canvas.getContext("2d");
  this.TO_RADIANS = Math.PI /180;

  this.drawRectangle = function(x, y, color = null, width =1, height=1) {
	if (color == null){color = "#ffffff";};
    this.buffer.fillStyle = color;
    this.buffer.fillRect(x, y, width, height);

  };
  this.drawCircle = function(x, y, r, color = "#434", type = "both"){
	  if(type == "fill"){ 
		this.buffer.fill();
		this.buffer.fillStyle = color
	  }
	  else{ this.buffer.stroke(); }
	  
      this.buffer.fillStyle = color;
	
	  this.buffer.arc(x,y,r, 0, 360 * this.TO_RADIANS);
	  
	  if(type == "both"){ 
		this.buffer.fillStyle = color;
		this.buffer.fill();
		this.buffer.stroke();
	  } else if(type == "fill"){ 
		this.buffer.fillStyle = color;
		this.buffer.fill();
	  }
	  else{ this.buffer.stroke(); }
	  
  };
  this.update = function(){
	/*this.drawRectangle(0, 0, "#dfdeee",width, height);
	this.drawRectangle(0, height-29, "#654321",width, 31);
	
	
	let cx = cannon.x;
	let cy = cannon.y;
	
	//power bar
	let yhh = 13;
	this.drawRectangle(cx-25, cy+yhh, "#806030", 45, 16);
	let borderThickness = 2;
	this.drawRectangle(cx-25+borderThickness, cy+yhh+borderThickness, "#654321", 45-(2*borderThickness), 16-(2*borderThickness));
	this.drawRectangle(cx-25+borderThickness, cy+yhh+borderThickness, "#00ff00", cannon.power * (45-(2*borderThickness)), (16-(2*borderThickness)));
*/
  };
  this.drawObject = function(image, x,y,size){
	  this.drawRectangle(x,y);
	  //console.log(size);
	  try{ this.buffer.drawImage(image, x,y,size, size);}
	  catch(e){ console.log("Bubble failed to load");}
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
	  
	  //console.log(width +"  " + height);
    if (height / width > height_width_ratio) {
      this.context.canvas.height = width * height_width_ratio;
      this.context.canvas.width  = width;
    } else {
      this.context.canvas.height = height;
      this.context.canvas.width  = height / height_width_ratio;
    }
    this.context.imageSmoothingEnabled = true;// ****************too
  };
};

Display.prototype = {
  constructor : Display,
  render:function() { this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height); }
};