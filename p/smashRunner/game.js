
const Game = function(w,h) {
  this.world    = new Game.World(w,h);
  this.update   = function(t) {
    this.world.update(t);
  };
};
Game.prototype = { constructor : Game };


Game.World = function(w,h,g = 1.29) {
	this.height = h;
	this.width = w;
	this.gravity = g;
  
	this.fps = 50;
	this.player = undefined;
	
	this.enemys = [];
	this.hazards = [];
	this.powerUps = [];
	this.particles = [];
	this.walls = [];
	
	this.playerSize = 22;
	
	this.leftBoarder = 25;
	this.rightBoarder = this.width - 25;
  
	this.score = 0;
};
Game.World.prototype = {

  constructor: Game.World,
  
  setup:function() {
	console.log("Welcome to Smash Runner's Console");
	
	this.player = new Game.Player((this.width/2) - (this.playerSize/2), this.height - (3.5 * this.playerSize), this.leftBoarder, this.rightBoarder, this.playerSize, this.gravity);
  },

  update:function() {
	  this.player.update();
	  this.player.animate();
  }
};

Game.Player = function(xx,yy,lb = 0, rb = 200, ss = 60, gg = 5){
	this.g = gg;
	
	this.leftBoarder = lb;
	this.rightBoarder = rb;
	
	this.x = xx;
	this.y = yy;
	
	this.vx = 15* ((Math.random() > .5)? 1:-1);
	this.vy = 0;
	
	// this.pvx = this.vx;
	// this.pvy = this.vy;
	
	this.w = ss;
	this.h = ss;
	
	const size = ss; // playerSize // default width and height
	
	this.up = false;
	this.down=false;
	this.fire=false;
	
	this.angle = 30;
	
	this.damageMin       = 3; // combine and turn into a whole function
	this.damageFactor    = .2; // function of speed     + min damage
	
	this.bounceFactor    = 0;
	this.smashFactor     = 0;
	
	this.smashing = false;
	this.smashSpeed      = 42; // in addition to current |speed|
	this.jumpSpeed       = 13;
	this.superJumpSpeed  = 25; // to get to the other side

	this.healRate = .01; // life per sec:   ==> will need to convert to heal each frame: healRate/fps
	
	this.gravityRight = (Math.random() > .5)? 1:-1;
	
	this.isGroundedRight = function(){
		return (this.x + this.w + 0 >= this.rightBoarder);
	};
	this.isGroundedLeft = function(){
		return (this.x - 0 <= this.leftBoarder);
	};
	this.grounded = this.isGroundedLeft() || this.isGroundedRight();
	this.getSide = function(){ return (this.x + (this.w/2) < (this.leftBoarder + this.rightBoarder)/2 )? -1:1;}
};
Game.Player.prototype = {
	constructor: Game.Player,
	// move, collide (walls, objs), pos and shape(v), 
	
	update:function(){		
		this.x += this.vx;
		this.y += this.vy;
		
		if(this.x <= this.leftBoarder){
			this.smashing = false;
			this.x = this.leftBoarder;
			if(this.vx < -1){
				this.vx = -this.vx * this.bounceFactor;
			}
			else{
				this.vx = 0;
			}
		}
		if(this.x + this.w >= this.rightBoarder){
			this.smashing = false;
			this.x = this.rightBoarder - this.w;
			if(1< this.vx){
				this.vx = -this.vx * this.bounceFactor;
			}
			else{
				this.vx = 0;
			}
		}
		
		this.vx += this.g * this.getSide();
		//this.vx += this.gravityRight * this.g;
		//this.vx += (this.g/30) * ((this.x + (this.w / 2)) - ((this.rightBoarder - this.leftBoarder)/2));
		//this.vx += (this.g/30) * ((this.x + (this.w / 2)) - ((this.rightBoarder - this.leftBoarder)/2));
		
		// width and height as a function of speed // maybe also acceleration and jerks
		// move and change v(g)
		// collide with outer walls
	},
	jump:function(speed = this.jumpSpeed){
		if(this.isGroundedLeft()){ this.vx += speed;}
		else if(this.isGroundedRight()){ this.vx += -speed;}
		else return -1;
	},
	superJump:function(){
		this.jump(this.superJumpSpeed);
		//this.gravityRight *= -1;
	},
	smash:function(){
		if(!this.isGroundedLeft() && !this.isGroundedRight() && !this.smashing){
			this.vx = this.smashSpeed * this.getSide();
			this.smashing = true;
		}
	},
	collide:function(obj){
		// boxcollider
			// smash?
				// damage
				// bounce dv
				// particles
			// hit damage to self?
				// goo's blood particles
			
			// hit floor or cushion?
				// if speed too great and not on coushion:
					// damage
					// green particles
					// stuck
				// else bounce
				
		// for each particleSpawn situation, add particles to super list
			// array1.push.apply(array1, array3);
	},
	animate:function(){ // size, shape, relative pos, frame
		// width and height as a function of speed
		// move + fix pos as a func of size/shape
	},
		
	updateLife:function(){	
	// Lives
			// dead?
			// heal?
	
		// if(this.up) {
			// this.angle = this.angle + this.turnspeed;
			// if(this.angle>60) this.angle = 60;
		// }
		// if(this.down) {
			// this.angle = this.angle - this.turnspeed;
			// if(this.angle< -20) this.angle = -20;
		// }
	}
};

Game.Particle = function(x,y,vxs,vys, sz){
	this.x = x;
	this.y = y;
	this.vx = vxs;
	this.vy = vys;
	this.size = sz;
	
	this.particleSize    = 25 + Math.random( 10);
	this.particleSpeed   = 20 + Math.random( 20);
	this.particleLife    = .5 + Math.random(1.5); // in seconds
};

Game.Particle.prototype = {
	constructor: Game.Particle,
	update:function(g){
		// change time left
		// expired?
		// move
		// change speed (gravity)
		// bounce on floor?
	}
};


