const Game = function(w=20,h=30) {
  this.world    = new Game.World(w,h);
  this.update   = function(t) {
    this.world.update(t);
  };
};
Game.prototype = { constructor : Game };


Game.World = function(w=200,h=300,n= Math.floor((Math.random() * 49) +1), r = 9, k = .00001 * (.1 +(.9* Math.random())), wm =.2, om=1.2, OIL = Math.random(),gravity = .00001 * (.1 +(9* Math.random())), psh = .5, sS = (Math.random() * 4) + 1, wfm = .00001) {
  this.gravity      = gravity;
  this.height = h;
  this.width = w;
  this.points = [];
  this.numberOfPoints = n
  this.radiusOfPoints = r;
  this.forceMagnitude = k;
  this.pointsStartHeight = psh;
  this.speedScalar = sS;
  this.waterMass = wm; 
  this.oilMass = om;
  this.wallForceMagnitude = wfm;
  this.oilInLiquid = OIL;
  this.colors = [[0,0,200, .6],[230/2,255/2,77/2, .8]];
};
Game.World.prototype = {

  constructor: Game.World,
  
  setup:function() {
	 
	console.log("Version Fluid Beta 1.02");
	if (Math.random() < .5){this.numberOfPoints = 1 + Math.floor(Math.random() * 3) }
	
	let oo =Math.round( this.numberOfPoints * this.oilInLiquid);
	let ww =Math.round( this.numberOfPoints * (1-this.oilInLiquid));
	let script = "//////////////////////////\n///////Julien Owhadi//////\n//////////////////////////\n\n";
	script = script + "Hello. You have about "+oo+" oil particles & "+ww+" water particles";
	script = script + "\nHere are a list of variable variables:\n\n";
	script = script + "The speed scalar is "+ this.speedScalar;
	script = script + "\nThe force magnitude is "+ this.forceMagnitude;
	script = script + "\nThe gravity scalar is "+ this.gravity;
	script = script + "\n\n And thats all the freedom I will give you \n";
	script = script + "\n  ___________________  ";
	script = script + "\n /                   \\ ";
	script = script + "\n |      \\\\\\\\\\\\|/     |";
	script = script + "\n |     /     #  \\    |";
	script = script + "\n |    _| __|___ |_   |";
	script = script + "\n |   ( ! U V U  ! )  |";
	script = script + "\n |    \\|  (_)   |/   |";
	script = script + "\n |     \\ \\___/  /    |";
	script = script + "\n |      \\______/     |";
	script = script + "\n \\___________________/";
	console.log(script);
	
	if(this.numberOfPoints > 35) {
		alert("This is my original fluid(s) simulator. It contains both water and oil particles that vary in number and ratio every time the page is reloded. Other variables such as gravity, force amplifier, & speed also change.\n\nIn this run, there are " + oo+" oil particles & "+ww+" water particles\nBeware though: this run has more than 35 particles & Due to the small container, it may seem glitchy (but because it is a simulator, it is not)\n& Yes it does look like air molecules but again,this is due to the small size.\n\n Have Fun!");
	}
	else {
		alert("This is my original fluid(s) simulator. It contains both water and oil particles that vary in number and ratio every time the page is reloded. Other variables such as gravity, force amplifier, & speed also change.\n\nIn this run, there are about " + oo+" oil particles & "+ww+" water particles\n*look in the console for more information\n\nHave Fun");
    }
	this.points = new Array();
	let v = this.speedScalar * this.numberOfPoints / (this.height * this.width);
	let olet = this.numberOfPoints *(1- this.oilInLiquid);
	for(let i = 0; i< this.numberOfPoints;i++){
		if ( i > olet){
			this.points[i] =new Game.Point((Math.random() * this.width),
				(Math.random() * this.height * this.pointsStartHeight) + ((1- this.pointsStartHeight) *this.height),
				this.radiusOfPoints, this.oilMass,  [(v* Math.random()) - (v/2), (v*Math.random())-(v/2)], this.colors[1]); 

		}
		else{
			this.points[i] =new Game.Point((Math.random() * this.width),
				(Math.random() * this.height * this.pointsStartHeight) + ((1- this.pointsStartHeight) *this.height),
				this.radiusOfPoints, this.waterMass,  [(v* Math.random()) - (v/2), (v*Math.random())-(v/2)], this.colors[0]); 
		}
	}
  },

  update:function(t) {
	for(let i = 0; i< this.points.length;i++){
		for(let e = i+1; e< this.points.length;e++){
			this.points[i].check(this.points[e],this.forceMagnitude, t);
		}
		//console.log(`V: ${this.points[i].v}. The x: ${this.points[i].x} & y: ${this.points[i].y} & lastly the mass: ${this.points[i].m}`);
		this.points[i].update(t, this.wallForceMagnitude, this.gravity, [this.width,this.height]);
	}
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
	check:function(pt, k, t){
		let dx = this.x- pt.x;
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

		let calc = this.v[1] + (t*g);
		//if(this.y <= 0) {calc *= 3}
		
		this.v[1]= calc;
		let calcTV = (t * this.v[0]) + this.x;
		this.x = calcTV;
		calcTV = (t * this.v[1]) + this.y;
		this.y = calcTV;
		//console.log((this.x + (t * this.v[0])) + " = " +this.x + " + ("+t+" * "+this.v[0]+")");
		//console.log("LL"+this.y);
		// go to otherside method x-axis
		if (this.x <=0 && this.v[0] < 0){
				this.x = boundaryBR[0] -1;
		}
		if (this.x >= boundaryBR[0] -1 && this.v[0] > 0){
				this.x = 0;
		}
		
		//floor: y axis reflect and force
		//if (this.y >=.9*(boundaryBR[1] -1)){
			
			if (this.y >=boundaryBR[1] -1){
				this.y = boundaryBR[1] -1;
				this.v[1] = -Math.abs(this.v[1]);
			}	
			/*
			let d = boundaryBR[1] -1 - this.y;
			
			if(d<.05){ d = .051;}
			let force = -k / d;
			let calcT02 = this.v[1]  + (force * t / this.m);
			this.v [1]= calcT02;
		}	*/
		
		// if bottom removed:  can go into the sky but starts to bug with n > 50
		
		//if (this.y <=.1*(boundaryBR[1] -1)){
			if (this.y <=0){
				this.y = 0;
				this.v[1] =  Math.abs(this.v[1]);
			}/*
			let d = this.y;
			
			if(d<.05){ d = .051;}
			let force = k / d;
			let calcT02 = this.v[1]  + (force * t / this.m);
			this.v [1] = calcT02;
		}
		*/
		
/*  Removed Force and reflect wall method
		//reflections optimizer
		//wall force
		if (this.x <=.1*(boundaryBR[0] -1)){
			if (this.x <=0){
				this.x = 0;
				this.v[0] = Math.abs(this.v[0]);
			}
			let d = this.x;
			
			if(d<.05){ d = .051;}
			let force = k / d;
			let calcT01 = this.v[0] + (force * t / this.m);
			let calcT02 = this.v[1] ;
			this.v = [calcT01, calcT02];
		}
		
		if (this.y <=.1*(boundaryBR[1] -1)){
			if (this.y <=0){
				this.y = 0;
				this.v = [this.v[0], Math.abs(this.v[1])];
			}
			let d = this.y;
			
			if(d<.05){ d = .051;}
			let force = k / d;
			let calcT01 = this.v[0];
			let calcT02 = this.v[1]  + (force * t / this.m);
			this.v = [calcT01, calcT02];
		}
		
		if (this.x >=.9*(boundaryBR[0] -1)){
			if (this.x >=boundaryBR[0] -1){
				this.x = boundaryBR[0] -1;
				this.v = [-Math.abs(this.v[0]), this.v[1]];
			}
			let d = boundaryBR[0] -1 - this.x;
			
			if(d<.05){ d = .051;}
			let force = -k / d;
			let calcT01 = this.v[0] + (force * t / this.m);
			let calcT02 = this.v[1] ;
			this.v = [calcT01, calcT02];
		}
		
		if (this.y >=.9*(boundaryBR[1] -1)){
			
			if (this.y >=boundaryBR[1] -1){
				this.y = boundaryBR[1] -1;
				this.v[1] = -Math.abs(this.v[1]);
			}	
			let d = boundaryBR[1] -1 - this.y;
			
			if(d<.05){ d = .051;}
			let force = -k / d;
			let calcT01 = this.v[0];
			let calcT02 = this.v[1]  + (force * t / this.m);
			this.v = [calcT01, calcT02];
		}	
		*/
	}
};


