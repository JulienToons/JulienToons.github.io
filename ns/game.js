const Game = function() {
  this.world    = new Game.World();
  this.update   = function(t) {
    this.world.update(t);
  };
};
Game.prototype = { constructor : Game };


Game.World = function(w=200,h=120,) {
  this.height = h;
  this.width = w;
  this.framesPassed = 0;
};
Game.World.prototype = {

  constructor: Game.World,
  
  setup:function() {
	 
	console.log("Version Fluid Beta 1.02");
	
  },

  update:function(t) {
	  this.framesPassed++;
		//console.log(this.framesPassed/100);
  }
};



Game.Point = function(sx= 2.0){
	this.x = sx;
};
Game.Point.prototype = {
	constructor: Game.Point,
	check:function(pt){

	},
	update:function(t){
		
	}
};


