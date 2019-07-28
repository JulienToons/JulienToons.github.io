

const Display = function(canvas, container) {

  this.buffer  = document.createElement("canvas").getContext("2d"),
  this.context = canvas.getContext("2d");

  this.drawRectangle = function(x, y, color, width =1, height=1) {
	//if (color == null){color = "#ffffff";};
    this.buffer.fillStyle = color;
    this.buffer.fillRect(Math.floor(x), Math.floor(y), width, height);

  };
  this.update = function(){
	this.drawRectangle(0, 0, "#000",canvas.width, canvas.height);

  }
  
  
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
    this.context.imageSmoothingEnabled = false;// ****************too
  };
};

Display.prototype = {
  constructor : Display,
  render:function() { this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height); }
};