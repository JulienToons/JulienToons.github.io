

const Display = function(canvas) {

  this.buffer  = document.createElement("canvas").getContext("2d"),
  this.context = canvas.getContext("2d");

  this.drawRectangle = function(x, y, color, width =1, height=1) {
	//if (color == null){color = "#ffffff";};
    this.buffer.fillStyle = color;
    this.buffer.fillRect(Math.floor(x), Math.floor(y), width, height);

  };
  this.drawGameBoard = function(w,h,pts, r = 1){
	let matrix = [];
	for(let i=0; i<w; i++) {
		   matrix[i] = [];
		for(var j=0; j<h; j++) {
			matrix[i][j] = [0,0,0, 0];  // can change color from scalar to rgb soon
		}
	}
	for(let i=0; i<pts.length; i++) {		
	
		let calcY = Math.floor(pts[i].y);
		let calcX = Math.floor(pts[i].x);
		//console.log(i + " so " + calcX + " & "+calcY + "::::" + pts[i].x);
		try {
			//console.log(pts[i].color[2]);
			matrix[calcX][calcY][0] =+ pts[i].color[0];
			matrix[calcX][calcY][1] =+ pts[i].color[1];
			matrix[calcX][calcY][2] =+ pts[i].color[2];
			matrix[calcX][calcY][3] =+ pts[i].color[3];
			
		}
		catch (e){
			console.log("particle "+i+" is in the air");
		}
					//console.log(i+"ll"+calcX + "/" + calcY);
					//console.log(matrix[calcX][calcY]);

	}
	
	for(let i=0; i<w; i++) {
		for(let j=0; j<h; j++) {
			if(matrix[i][j][0] == 0 && matrix[i][j][1] == 0 && matrix[i][j][2] == 0){
				matrix[i][j][0] = 273;
				matrix[i][j][1] = 273;
				matrix[i][j][2] = 273;
			}else{
				if (matrix[i][j][0] > 273){
					let d = .5 * (matrix[i][j][0]-273);
					matrix[i][j][2] += d;
					matrix[i][j][1] += d;
					matrix[i][j][0] = 273;
				}
				if (matrix[i][j][1] > 273){
					let d = .5 * (matrix[i][j][1]-273);
					matrix[i][j][2]+=d;
					matrix[i][j][1] = 273;
				}
				if (matrix[i][j][2] >= 273){
					matrix[i][j][2] = 273;
				}
				
			}
			let r = matrix[i][j][3];
			if (r == 0 || r > 1){r = 1;}
			
			this.drawRectangle(i,j,`rgb(${matrix[i][j][0]},${matrix[i][j][1]},${matrix[i][j][2]})`, r,r);
		}
	}
	//this.drawRectangle(0,0,`rgb(${0},${273}, ${273})`);

}
  this.resize = function(width, height, height_width_ratio) {
    if (height / width > height_width_ratio) {
      this.context.canvas.height = width * height_width_ratio;
      this.context.canvas.width  = width;
    } else {
      this.context.canvas.height = height;
      this.context.canvas.width  = height / height_width_ratio;
    }
    this.context.imageSmoothingEnabled = false;
  };
};

Display.prototype = {
  constructor : Display,
  render:function() { this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height); }
};