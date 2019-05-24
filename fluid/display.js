

const Display = function(canvas) {

  this.buffer  = document.createElement("canvas").getContext("2d"),
  this.context = canvas.getContext("2d");

  /*  NEED 2 ADD Draw Options  //************************************************************************************!!!!!!!!!
  //USEFUL!!! -->>   https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
  this.drawMap = function(image, image_columns, map, map_columns, tile_size) {

    for (let index = map.length - 1; index > -1; -- index) {

      let value         = map[index];
      let source_x      =           (value % image_columns) * tile_size;
      let source_y      = Math.floor(value / image_columns) * tile_size;
      let destination_x =           (index % map_columns  ) * tile_size;
      let destination_y = Math.floor(index / map_columns  ) * tile_size;

      this.buffer.drawImage(image, source_x, source_y, tile_size, tile_size, destination_x, destination_y, tile_size, tile_size);

    }

  };
*/

  this.drawRectangle = function(x, y, width, height, color) {

    this.buffer.fillStyle = color;
    this.buffer.fillRect(Math.floor(x), Math.floor(y), width, height);

  };

  this.fill = function(color = "rgba(180,196,211,0.25)") {

    this.buffer.fillStyle = color;
    this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);

  };

  this.drawPoint = function(x=5,y=15, r=1){
	  this.buffer.fillStyle = "rgba(0,0,211,0.25)";
      this.buffer.fillRect(x-r/2,y-r/2,r,r);
  }
  this.drawLine = function(points){
	  if(points.length>0){
		  this.drawPoint(points[0].pos[0],points[0].pos[1],40);
		  this.buffer.beginPath();
		  this.buffer.moveTo(points[0].pos[0],points[0].pos[1]);
		  if(points.length>1){
			for(let i =1;i<points.length;i++){
				this.drawPoint(points[i].pos[0],points[i].pos[1],20);
				this.buffer.lineTo(points[i].pos[0],points[i].pos[1]);
			}
			this.drawPoint(points[points.length-1].pos[0],points[points.length-1].pos[1],40);
		  }
		  this.buffer.stroke();
	  }
  }
  this.drawObject = function(image, source_x, source_y, destination_x, destination_y, width, height) {

    this.buffer.drawImage(image, source_x, source_y, width, height, Math.round(destination_x), Math.round(destination_y), width, height);

  };

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