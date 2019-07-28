const Game = function(w,h) {
  this.world    = new Game.World(w,h);
  this.update   = function(t) {
    this.world.update(t);
  };
};
Game.prototype = { constructor : Game };


Game.World = function(w,h,g = .6) {
  this.height = h;
  this.width = w;
  this.gravity = g;

  this.cannon = undefined;
  this.bullets = [];
  this.bubbles = [];
  
  this.score = 0;
  
  this.spawnRate = 50;  //spawn one every so frames
  this.bubbleSpeed = 3;
  this.antiGravity = -.63;
  this.averageBubbleRadius = 40;
  this.frameCount = 0;

};
Game.World.prototype = {

  constructor: Game.World,
  
  setup:function() {
	console.log("Version Fluid Beta 1.02");
	
	this.cannon= new Game.Cannon([30, this.height-36],this.gravity,45,[28,-18],[-7,-7]);//[11,-25]  [33,-9.6]
  },

  update:function() {
	  this.frameCount = this.frameCount- 1;
	  if(this.frameCount <= 0){  // pop if float
		  this.frameCount = this.spawnRate;
		  let velRandom = [this.bubbleSpeed * 2 * (.5 - Math.random()), this.bubbleSpeed * 2 * (.5 -Math.random())];
		  let newBubble = new Game.Bubble(this.width * (.95 - (.7 * Math.random())), (this.height-40) * (1 - (.5 * Math.random())), velRandom, this.averageBubbleRadius * (1.7 - (1.4 * Math.random())));
		  this.bubbles.push(newBubble);
	  }
	  let bubblesToRemove = [];
	  for(let i =0; i<this.bubbles.length; i++){
		  let calcG = this.gravity + this.antiGravity;
		  this.bubbles[i].update(calcG);
		  let tempVar = this.bubbles[i].check(this.width);
		  for(let ii =0; ii<this.bullets.length; ii++){
			let tempVar2 = this.bullets[ii].checkPop(this.bubbles[i]);

			if(tempVar2) {tempVar = true;this.score++;}
		  }
		  if(tempVar){
				bubblesToRemove.push(i);
		 }
	  }
	  for(let ii =0; ii<bubblesToRemove.length; ii++){
		  this.bubbles.splice(bubblesToRemove[ii],1);
	  }
	  
	  
	  let newBullet = this.cannon.update();
	  let length = this.bullets.length;
	  if(newBullet != null){
		length = this.bullets.push(newBullet);
	  }
	  let bulletsToRemove = [];
	  for(let i =0; i<length; i++){
			this.bullets[i].update(this.gravity);
			let tempVar = this.bullets[i].check(this.width,this.height-27-this.cannon.bulletRadius); //right, bottom
			if(tempVar){
				bulletsToRemove.push(i);
			}
	  }
	  for(let i =0; i<bulletsToRemove.length; i++){
		  this.bullets.splice(bulletsToRemove[i],1);
	  }

  }
};

Game.Cannon = function([xx,yy], g, ss = 60, [pxx,pyy],[pcxx,pcyy]){
	this.x = xx;
	this.y = yy;
	this.size = ss;
	this.px = pxx; // position offset from x and y to spawn bullet
	this.py = pyy;
	this.pcx = pcxx; 
	this.pcy = pcyy;

	this.bulletRadius = 14;
	this.up = false;
	this.down=false;
	this.fire=false;
	this.angle = 30;
	
	this.fireFrameRate = 30; // frames between fires
	this.turnspeed = 5;//per frame
	this.bulletSpeed = 30;
	this.framesTillRefire = 0;
	this.framesTillFullPower = 30;
	
	this.power = 0;
	this.loading= false;
};
Game.Cannon.prototype = {
	constructor: Game.Cannon,
	update:function(){
		
		if(this.up) {
			this.angle = this.angle + this.turnspeed;
			if(this.angle>60) this.angle = 60;
		}
		if(this.down) {
			this.angle = this.angle - this.turnspeed;
			if(this.angle< -20) this.angle = -20;
		}
		
		if(!this.loading)this.framesTillRefire -= 1;
		
		
		let newBullet = null;
		
		if(this.fire){
			if(this.framesTillRefire <= 0) {
				this.loading = true;
				this.framesTillRefire =this.fireFrameRate;
			}
			if(this.loading){
				this.power += 1/this.framesTillFullPower;
			}
			if(this.power>1) this.power = 1;
		}
		else if(this.loading){
			let dtr =  Math.PI/180;
			let radAng = ((0 - this.angle) * dtr) + Math.atan(this.py/this.px);

			//console.log("ang: "+radAng);
			
			let dd = Math.sqrt((this.px * this.px) + (this.py + this.py))
			
			let calcX = dd * Math.cos(radAng);
			let calcY = dd * Math.sin(radAng);
			
			let bsANDp= 1.7 + (this.bulletSpeed * this.power);
			radAng = radAng + (32 * dtr);
			let newBulletVelocity = [bsANDp * Math.cos(radAng),bsANDp * Math.sin(radAng)];

			
			newBullet = new Game.Bullet([this.pcx + this.x + calcX, this.pcy + this.y + calcY], newBulletVelocity,this.bulletRadius);
			console.log("fire at "+ Math.floor(this.power * 100) + "% power");
			this.power = 0;
			this.loading = false;
		}
		
		return newBullet;
		// return spawned bullets
	}
};

Game.Bullet = function(pos, vel, r = 2){
	this.position = pos;
	this.velocity = vel;
	this.radius = r;
};
Game.Bullet.prototype = {
	constructor: Game.Bullet,
	checkPop:function(bubble){
		let safeDistance2 = -2;
		let safeMult = .86;
		let r1 = this.radius;
		let r2 = bubble.radius * safeMult;
		let ddd = this.distance(this.position[0] + r1 - (bubble.x + r2), this.position[1] + r1 - (bubble.y + r2));
		if (ddd <= r1 + r2 + safeDistance2) {
			console.log("Popped by a bullet! " + ddd + "  <  "+(r1 + r2));
			
			return true;
		}
		else return false;
	},
	check:function(mx,my, friction = .7){
		let safeFriction = .5;
		let safeBallRemoveSpeed = .5;
		if(this.position[0] < 0){
			this.position[0] = 0;
			this.velocity[0] = friction * Math.abs(this.velocity[0]);
			this.velocity[0] = -safeFriction +Math.abs(this.velocity[0]);

		}
		if(this.position[0] > mx){
			this.position[0] = mx;
			this.velocity[0] = friction * -Math.abs(this.velocity[0]);
			this.velocity[0] = safeFriction -Math.abs(this.velocity[0]);

		}
		if(this.position[1] < 0){
			this.position[1] = 0;
			this.velocity[1] = friction * Math.abs(this.velocity[1]);
			this.velocity[1] = -safeFriction +Math.abs(this.velocity[1]);

		}
		if(this.position[1] > my){
			this.position[1] = my;
			this.velocity[1] = friction * -Math.abs(this.velocity[1]);
			this.velocity[1] = safeFriction -Math.abs(this.velocity[1]);
			this.velocity[0] = this.velocity[0] * .8;
		}
		
		if (safeBallRemoveSpeed > this.distance(this.velocity[0], this.velocity[1])){
			return true;
		}
		else return false;
	},
	distance:function(x,y){
		return Math.sqrt((x*x) + (y*y));
	},
	update:function(g){
		//console.log(this.velocity);
		this.position[0] = this.position[0] + this.velocity[0];
		this.position[1] = this.position[1] + this.velocity[1];
		
		this.velocity[1] = this.velocity[1] + g;
	}
};
Game.Bubble = function(x,y, vel = 0, r = 70){
	this.x = x;
	this.y = y;
	this.velocity = vel;
	this.radius = r;
};
Game.Bubble.prototype = {
	constructor: Game.Bubble,
	check:function(mx,friction = .7){

		if(this.x > mx - this.radius){
			this.x = mx - this.radius;
			this.velocity[0] = -friction * Math.abs(this.velocity[0]);

		}
		if(this.x < 0){
			this.x = 0;
			this.velocity[0] = friction * Math.abs(this.velocity[0]);

		}
		if(this.y <= 0){
			console.log("pop");
			return true;
		}
		else return false;
	},
	distance:function(x,y){
		return Math.sqrt((x*x) + (y*y));
	},
	update:function(g){
		this.x = this.x + this.velocity[0];
		this.y = this.y + this.velocity[1];
		//console.log(this.velocity);
		this.velocity[1] = this.velocity[1] + g;
	}
};


