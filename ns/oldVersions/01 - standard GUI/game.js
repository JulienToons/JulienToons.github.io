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
		console.log(this.framesPassed/100);
  }
};

Game.Point = function(sx= 2.0,sy = 2.0,r = 2, m=1, vel = [0,0], c = [0,237,230, .6]){  // color is blue pink yellow
	this.x = sx;
	this.y = sy;
	this.v = vel;
	this.r = r;
	this.color = c;
	this.m = m;
};
Game.Point.prototype = {
	constructor: Game.Point,
	check:function(pt, k, t, boundaryBR = [Game.World.width, Game.World.height]){
		let dx = Math.min(this.x- pt.x, boundaryBR[0] - this.x + pt.x, boundaryBR[0] - pt.x + this.x);
		let dy = this.y - pt.y;
		let d = Math.sqrt( (dx*dx) + (dy*dy));
				//console.log("JSJSKHDIK" + d);
		
		if(d<this.r && d != 0){
			if(d<.01) {d = .1;}
			let force = -k / d;
			let calcT01 = this.v[0] + (force * t *dx / (d*this.m));
			let calcT02 = this.v[1] + (force * t *dy / (d*this.m));
			//console.log(`Force is ${force}. this.m is ${this.m}. the distance (d) is ${d}. t is ${t}. vx is ${this.v[0]} & vy is ${this.v[1]}`);
			//console.log(calcT01 + "  ---  " + calcT02);
			this.v = [calcT01, calcT02];
			calcT01 = pt.v[0] + (force * t *dx / (d*this.m));
			calcT02 = pt.v[1] + (force * t *dy / (d*this.m));
			pt.v = [calcT01, calcT02];
		}
		
	},
	update:function(t, k, g = .5, boundaryBR = [Game.World.width, Game.World.height]){

		
	}
};


