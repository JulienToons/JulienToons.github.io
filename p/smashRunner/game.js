
const Game = function(w,h) {
  this.world    = new Game.World(w,h);
  this.update   = function(rt) {
    this.world.update(rt);
  };
};
Game.prototype = { constructor : Game };


Game.World = function(w,h,g = 1.25) {
	this.height = h;
	this.width = w;
	this.gravity = g;
  
	this.fps = 50;
	this.player = undefined;
	
	this.powerUps = [];
	this.enemys = [];
	
	this.hazards = [];
	this.particles = [];
	this.holes = [];
	
	this.walls = [];
	
	this.playerSize = 22;
	
	this.hstats = {minLife: 2000,
				   maxLife: 3000,
				   size: this.playerSize * 1}
	
	this.pstats = {horizontalBounceFactor: .9,
				   verticalBounceFactor: .4,
				   minSpawnRate: 8,
				   maxSpawnRate: 15,
				   defaultSpeed: 5,
				   speedAmp: .55,
				   speedMin: .6,
				   speedMax: 1,
				   minLife: 4500,
				   maxLife: 5500,
				   minWidth: 5,
				   maxWidth: 12}
	
	this.leftBoarder = 25;
	this.rightBoarder = this.width - 25;
	
	this.scrollingSpeed = 6;
  
	this.score = 0;
	
	this.spawnTime = f.random(1000,2000);
};
Game.World.prototype = {

  constructor: Game.World,
  
  setup:function() {
	console.log("Welcome to Smash Runner's Console");
	
	this.player = new Game.Player((this.width/2) - (this.playerSize/2), this.height - (5 * this.playerSize), this.leftBoarder, this.rightBoarder, this.playerSize, this.gravity);
  },
  spawn:function(type = null, rawTime = 0){ // spike, enemy to squash=pts or else hit=die, powerups
		if(type == null || type == "random" || type == "rand"){
			let types = ["spike"]; // only spawnable hazards (not effects)
			type = types[Math.round(Math.random(types.length))];
		}
		switch (type){
			case "spike":
				let dir = (Math.random() < .5)? 1:-1;
				let tempH = 25;
				this.hazards.push({
							type: "spike",
							x: (dir > 0)? this.rightBoarder: this.leftBoarder,
							y: -2 * tempH,
							w: tempH * f.random(.25,1.5),
							h: tempH,
							d: dir
				});
				break;
			case "hole":
				let tempD = f.getSide(this.player.x, this.player.w, this.leftBoarder, this.rightBoarder);
				let tempX = this.player.x + ((tempD >= 0)? this.player.w:0);
				this.holes.push({
							x: tempX,
							y: this.player.y,
							d: - tempD,
							t: rawTime + f.random(this.hstats.minLife,this.hstats.maxLife),
							s: this.hstats.size
				});
				break;
			default:
				console.log("unknown object requested to spawn: '" + type + "' not spawned");
				
		}
  },
  updateObject(obj){
	  let state = false;
	  switch (obj.type){
			case "spike":
				obj.y += this.scrollingSpeed;
				if(obj.y >= this.height + (obj.s * 2)){
					state = true;
					//i += -1;
				}
				break;
			default:
				console.log("Error: null/no object was requested to be updated");				
		}
		return state; // return true if removable
  },
  
  update:function(rawTime) {
		let info = this.player.update(this.gravity);
		let dir = f.getSide(this.player.x, this.player.w, this.leftBoarder, this.rightBoarder);
		
		// spawn particles
		let tpv = info[0];
		
		if(tpv!=0){
			tpv *= this.pstats.speedAmp;
			let truns = f.random(this.pstats.minSpawnRate, this.pstats.maxSpawnRate);
			for(let i=0; i < truns;i++){
				let tt = rawTime + f.random(this.pstats.minLife, this.pstats.maxLife);
				//console.log(tt + "    " + (tt-rawTime));
				let tw = f.random(this.pstats.minWidth,this.pstats.maxWidth);
				let tx = this.player.x + (this.player.w/2) - (tw/2);
				let ty = this.player.y + (this.player.h/2) - (tw/2);
				let toRadians = Math.PI / 180;
				let ta = toRadians * f.random(0, 180);
				let tv = (tpv * f.random(this.pstats.speedMin, this.pstats.speedMax));
				tv += (this.pstats.defaultSpeed * Math.sign(tpv));
				this.particles.push(new Game.Particle(tx,ty,tv * Math.sin(ta),tv * Math.cos(ta),tw,tt, f.rgb(f.random(90,250),f.random(110,210),f.random(250,250))));
				// console.log(Math.round(tv * Math.sin(ta),4) + ", " + Math.round(tv * Math.cos(ta),4));
			}	  
		}
		//for(let i = this.particles.length-1; i >=0; i += -1){
		for(let i = 0; i < this.particles.length; i += 1){
			//this.particles[i].y += this.scrollingSpeed;
			if(this.particles[i].update(rawTime, this.gravity,this.leftBoarder,this.rightBoarder,this.pstats.horizontalBounceFactor,this.pstats.verticalBounceFactor, this.scrollingSpeed)){
				this.particles.splice(i,1);
				//i += -1;
			}
		}
		
		if(info[1]){ //*****
			this.spawn("hole", rawTime);
			console.log("hole deployed");
		}		  
		//for(let i = this.holes.length-1;i>=0;i+=-1){
		for(let i = 0; i < this.holes.length; i+=1){
			this.holes[i].y += this.scrollingSpeed;
			if(this.holes[i].t <= rawTime){
				this.holes.splice(i,1);
				//i += -1;
			}
		}
		
		if(this.spawnTime <= rawTime){
			this.spawnTime += f.random(500, 1500);
			this.spawn("spike");
		}
		//for(let i = this.hazards.length-1;i>=0;i+=-1){
		for(let i = 0; i<this.hazards.length;i+=1){
			if(f.collide(this.hazards[i], this.player)){
				console.log("HITTING");
				this.hazards.splice(i,1);
			}
			if(this.updateObject(this.hazards[i])){
				this.hazards.splice(i,1);
			}
		}
		
		this.player.animate();
	}
};

Game.Player = function(xx,yy,lb = 0, rb = 200, ss = 60){
	this.leftBoarder = lb;
	this.rightBoarder = rb;
	
	this.x = xx;
	this.y = yy;
	
	this.vx = 15* ((Math.random() > .5)? -1:1);
	this.vy = 0;
	
	const size = ss; // playerSize // default width and height
	
	this.w = ss;
	this.h = ss;
	
	this.up = false;
	this.down=false;
	this.fire=false;
	
	this.damageMin       = 3; // combine and turn into a whole function
	this.damageFactor    = .2; // function of speed     + min damage
	
	this.bounceFactor    = 0;
	this.smashFactor     = 0;
	
	this.smashing = false;
	this.smashSpeed      = 42; // in addition to current |speed|
	this.jumpSpeed       = 13;
	this.superJumpSpeed  = 25; // to get to the other side

	this.healRate = .01; // life per sec:   ==> will need to convert to heal each frame: healRate/fps
	this.life = 1;
	this.mana = 1;
	this.manaRefillRate = .01;
	
	this.gravityRight = (Math.random() > .5)? 1:-1;
	
	this.safetySpeedMin = 3;
	this.bouncing = true;
};
Game.Player.prototype = {
	constructor: Game.Player,
	
	update:function(g,lb,rb){		
	
		if(rb != undefined && lb != undefined){ // move this line to world update?
			this.leftBoarder = lb;
			this.rightBoarder = rb;
		}
		this.x += this.vx;
		this.y += this.vy;
		
		let smashed = false;
		let speedHit = 0;
		
		if(this.x <= this.leftBoarder){
			if(this.smashing){
				this.smashing = false;
				smashed = true;
			}
			this.x = this.leftBoarder;
			if(this.vx < -this.safetySpeedMin && this.bouncing){
				speedHit = this.vx;
				this.vx = -this.vx * this.bounceFactor;
			}
			else{
				this.vx = 0;
			}
		}
		if(this.x + this.w >= this.rightBoarder && this.bouncing){
			if(this.smashing){
				this.smashing = false;
				smashed = true;
			}
			this.x = this.rightBoarder - this.w;
			if(this.safetySpeedMin< this.vx){
				speedHit = this.vx;
				this.vx = -this.vx * this.bounceFactor;
			}
			else{
				this.vx = 0;
			}
		}
		
		this.vx += g * f.getSide(this.x,this.w, this.leftBoarder, this.rightBoarder);
		
		return [speedHit, smashed];
	},
	jump:function(speed = this.jumpSpeed){
		if(f.isGrounded(this.x, this.w, this.leftBoarder, this.rightBoarder, -1)){ this.vx += speed;}
		else if(f.isGrounded(this.x, this.w, this.leftBoarder, this.rightBoarder, 1)){ this.vx += -speed;}
		else return -1;
	},
	superJump:function(){
		this.jump(this.superJumpSpeed);
		//this.gravityRight *= -1;
	},
	smash:function(){
		if(!f.isGrounded(this.x,this.w, this.leftBoarder, this.rightBoarder,0) && !this.smashing){
			this.vx = this.smashSpeed * f.getSide(this.x,this.w, this.leftBoarder, this.rightBoarder);
			this.smashing = true;
		}
	},
	contains:function(obj){
		//return (this.x < obj.x || this.x + this.w > obj.x + obj.w) && (true);
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

Game.Particle = function(x,y,vx,vy, sz, endTime, c="#fff"){
	this.endTime = endTime;
	
	this.particleSize    = .8 + Math.random(.4);
	
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.w = sz;
	this.h = sz;
	this.c = c;
};

Game.Particle.prototype = {
	constructor: Game.Particle,
	update:function(t, g, leftBoarder, rightBoarder, bf = .6, vbf = .4, scrollingSpeed = 5){
		if(t - this.endTime > 0){
			return true;
		}
		this.x += this.vx;
		this.y += this.vy;
		
		if(this.x <= leftBoarder){
			this.x = leftBoarder;
			if(this.vx < -1){
				this.vx = -this.vx * bf;
			}
			else{
				//this.vx = 0;
			}
		}
		if(this.x + this.w >= rightBoarder){
			this.x = rightBoarder - this.w;
			if(1< this.vx){
				this.vx = -this.vx * bf;
			}
			else{
				//this.vx = 0;
			}
		}
		
		if(this.x <= leftBoarder || this.x + this.w >= rightBoarder){
			this.vy = ((this.vy - scrollingSpeed) * vbf) + scrollingSpeed;
		}
		
		this.vx += g * f.getSide(this.x,this.w, leftBoarder, rightBoarder);
		
		return false; // live
	}
};

class f{
	static isGrounded(x,w,lb,rb,mode=0){ // -1 = left   1 = right   0 = both
		if(mode == 1){ return (x + w + 0 >= rb);}
		else if(mode == -1){ return (x - 0 <= lb);}
		else{ return x + w + 0 >= rb || x - 0 <= lb;}
	};
	static getSide(x,w,lb,rb){ return (x + (w/2) < (lb + rb)/2 )? -1:1;}
	static random(a,b){ return a + ((b-a) * Math.random());};
	static rgb(r, g, b){
		r = Math.floor(r);
		g = Math.floor(g);
		b = Math.floor(b);
		return ["rgb(",r,",",g,",",b,")"].join("");
	}
	static collide(a,b){
		return  ( (a.y >= b.y && a.y <= b.y + b.h) || (a.y + a.h >= b.y && a.y + a.h <= b.y + b.h) ) &&
				( (a.x >= b.x && a.x <= b.x + b.w) || (a.x + a.w >= b.x && a.x + a.w <= b.x + b.w) );
	}
	static genericCollide(x1,x2,y1,y2,w1,w2,h1,h2){
		return  ( (y1 >= y2 && y1 <= y2 + h2) || (y1 + h1 >= y2 && y1 + h1 <= y2 + h2) ) &&
				( (x1 >= x2 && x1 <= x2 + w2) || (x1 + w1 >= x2 && x1 + w1 <= x2 + w2) );
	}
	static smashed(player, obj, side){
		return player.smashing && (side == -1)?(player.x - player.vx > obj.x + obj.w):(player.x + player.w - player.vx < obj.x);
	}
}
