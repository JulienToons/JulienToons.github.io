const Game = function (w, h, DEBUG=false) {
  this.world = new Game.World(w, h, .2, DEBUG);
  this.update = function (t = 0) {
    this.world.update();
  };
};
Game.prototype = { constructor: Game };


Game.World = function (w = 1000, h = 1000, cs=.2,debug) {
	const DEBUG = (f.exists(debug.on))? debug: {on:debug,mode:" vector-visualization !mouse-world mouse-field !mouse-stats "}; 

  this.height = h;
  this.width = w;
  this.camera = cs; // temp store size then set to camera class instance
  this.gravity = g;

	this.gamebjects = {}; // dictionary then list
  this.user = null; // player contains string and hammer
};
Game.World.prototype = {

	constructor: Game.World,

	setup:function() {
		console.log("Julien Owhadi's Physics Engine vPREALPHA 1.00001");
		this.camera = new Game.Camera(0,0,this.camera);

		// use dictionary of gameobjects:   ids and objs
		// https://pietschsoft.com/post/2015/09/05/javascript-basics-how-to-create-a-dictionary-with-keyvalue-pairs

		// let boundingSafetyVar = 40;
		// this.me = new Player(f.rand(boundingSafetyVar,this.width),f.rand(boundingSafetyVar,this.height),1,1);

	},

  update: function () {
		this.camera.update(this.me);
		this.me.update();
		for(let i = 0; i < this.objects.length; i++){
			this.objects[i].update();
		}
  }
};

Game.Camera = function(xx,yy,cs = .3){
	this.scale = cs;
	this.x = xx;
	this.y = yy;
	this.x_offset = 0;
	this.y_offset = 0;
	this.theta = 0;
	this.following = null;
	this.shakeFrames = 0;
	this.lerpFactor = .4;
	this.snapDistance = 2;
	// add shake animations with theta
};
Game.Camera.prototype = {
	constructor: Game.Camera,
	shake:function(){
		this.shakeFrames = 12;
	},
	update:function(player){
		// lerp function (aka slowly moves to player's pos as if connected by a smooth spring
		this.x = (Math.abs(this.x - player.x) <= this.snapDistance)?   (player.x) + (this.lerpFactor * (this.x - player.x))  :  player.x;
		this.y = (Math.abs(this.x - player.x) <= this.snapDistance)?  (player.y) + (this.lerpFactor * (this.y - player.y))  :  player.y;
	}
};

// collection of extendable classes
class GameObject{ // with rudimentary physics & colliders
	constructor(col,id = Math.round(1000000000 * Math.random()) ,type = "gameobject", quickIndex=0){
		this.col = col;
		this.connections = []; // of ids

		this.id = id;
		this.type = type; // "gameobject, nexttype, meteorite, player, rigidbody, etc." use indexof(n)==true?

		/* dont need bc I will use a dictionary with key=id
		this.quickIndex = quickIndex;
		this.*/

		this.renderer = new Renderer();
	}

	set collider(v){ this.col = v; }
	get collider(){ return this.col; }
	set transform(v){ this.col = v; }
	get transform(){ return this.col; }

	addConnection(id){
		this.connections.push(id);
	}
	set joints(v){ this.connections = v; }
	get joints(){ return this.connections; }

	render(display, renderer){
		// maybe put the next line in f.js
		// render based on vars in renderer & points on collider
		// one or two rendered objs

		// render connected gameobjects

		// render connections: ie: a line, a bungy, a string, a parabola, etc.
	}
};

// render: sfx
class Renderer{
	constructor(){
		// this is abstract
		// create individual objects for each renderer w. entirely diff. func.s
	}
}
/*
	highlights
	shadows

	glow
	random module texture
	moving texture

	incribe render...?

	Lens: transparency, color

	harmonic shifts

*/




// Generic Extendable Classes
class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  get pos() { return [this.x, this.y]; }
  set pos(pos) {
    this.x = pos[0];
    this.y = pos[1];
  }
  get position() { return [this.x, this.y]; }
  set position(pos) {
    this.x = pos[0];
    this.y = pos[1];
  }
};
class StrictTransform extends Position {
  constructor(x, y, vx, vy) {
    super(x, y);
    this.vx = vx;
    this.vy = vy;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
  }
  get v() { return [this.vx, this.vy]; }
  set v(v) {
    this.vx = v[0];
    this.vy = v[1];
  }
  get vector() { return this.v(); }
  set vector(v) { this.v(v); }
};
class Transform extends StrictTransform {
  constructor(x = 0, y = 0, vx = 0, vy = 0, theta = 0, av = 0) {
    super(x, y, vx, vy);
    this.angle = theta; // in radians counterclockwise from --> (rotated across the z-axis)
    this.angularVelocity = av;
  }
  update() {
    super.update();
    this.theta += omega;
  }
  get av() {
    return this.angularVelocity;
  }
  set av(x) {
    this.angularVelocity = x;
  }
  get theta() {
    return this.angle;
  }
  set theta(t) {
    this.angle = t;
	}
	get angleInDeg(){ 
		return f.toDeg(this.theta);
	};
	set angleInDeg(t){ 
		this.theta =  f.toRad(t);
	};
  get omega() {
    return this.angularVelocity;
  }
  set omega(x) {
    this.angularVelocity = x;
  }
};
class RigidBody2D extends Transform{
	constructor(x = 0,y = 0, vx = 0,vy = 0, theta = 0, av=0, density = 1) {
		super(x,y,vx,vy,theta, av);
		this.density = density;

		this.forces = [];

		this.centerOfMass = this.calculateCenterOfMass();
	}
	get com(){ return this.centerOfMass;}
	get rcom(){ return f.v.sub(this.centerOfMass, this.pos);}
	get relativeCenterOfMass() { return this.rcom;}


	calculateRelativeCenterOfMass(){
		return [0,0];
	}
	calculateCenterOfMass(){
		return this.pos;
	}
	get d(){
		return this.density;
	}
	get m(){
		return this.density * 1;  // for simplicity
	}
	get mass(){ return m;}
	get area () {return 5;}
	get inertia (){ return .4 * this.m * this.area/Math.PI;}

	worldPoint(pt){ // convert geometry point into world coordinates
		if(typeof pt == Number){
			pt = this.points[pt];
		}
		return f.v.add(this.pos, f.v.rotate(pt, this.theta));
	}

	toWorldPoint(pt){ return this.worldPoint(pt);}

	applyAcceleration(ax,ay){
		applyForce(ax * this.mass, ay * this.mass);
	}
	addWorldForce(fx = 0,fy = 0,ox = 0,oy = 0){ // in world coordinates
		let rop = f.v.sub([ox,oy], this.com);
	}
	applyWorldForce(...args){
		return this.addWorldForce(args);
	}
	addRelativeForce(fx = 0,fy = 0,ox = 0,oy = 0){ // in coordinates relative to this.pos
		let rop = f.v.sub([ox,oy], this.rcom);
	}
	applyRelativeForce(...args){
		return this.addRelativeForce(args);
	}
	applyForce(fx = 0,fy = 0,ox = 0,oy = 0){ // in coordinates relative to com
		this.forces.push({
			ox:ox,oy:oy,fx:fx,fy:fy
		});
	}
	addForce(fx = 0,fy = 0,ox = 0,oy = 0){
		this.forces.push({
			ox:ox,oy:oy,fx:fx,fy:fy
		});
	}
	get avgForce(){
		let ax = 0, ay= 0, alpha =0;
		for (force in this.forces){
			ax += force.fx/this.mass;
			ay += force.fy/this.mass;
			alpha += ((force.fx * force.ox) + (-force.fy * force.oy)) / this.inertia;
		}
		return [ax,ay,alpha];
	}
	fullUpdate(){
		preUpdate();
		update();
		postUpdate();
	}
	preUpdate(){
		// apply
	}
	update(){
		// execute with t = 1 frame
		let forceValuesTemp = this.avgForce;
		this.vx += forceValuesTemp[0];
		this.vy += forceValuesTemp[1];
		this.omega += forceValuesTemp[2];

		super.update();
	}
	postUpdate(){
		this.forces.clear();
	}

};

class Collider2D extends RigidBody2D{ // hollow colliders as cavity points??? like points[point[x,y]] then cavities[cavity[points[point[x,y]]]]
	constructor(x = 0,y = 0,vx = 0,vy = 0, theta = 0, av=0 ,pts = f.geometry.shape.square(),circles = [],density = 1) {
		super(x,y,vx,vy,theta, av, density);
		// points can either be outer points as in pts[point[x,y]] or shapes[pts[point[x,y]] , ... cavities]
		if(!Array.isArray( pts[0][0] )){
			this.pts = pts;
			this.cavities = [];
		} else {
			this.pts = pts[0];
			this.pts.splice(0,1);
			this.cavities = pts;
		}
		this.circles = circles;

		this.nextVx = vx;
		this.nextVy = vy;

		this.maxColliderDist = this.calculateMaxColliderDist();
	}
	collide(obj){
		if(this.contains(obj)){
			// elasticCollision
			// or inelastic collision with heat & friction incorporated into it
			// change nextVelocity & not current velocity
		}
	}
	calculateRelativeCenterOfMass(){
		// and apply to whole class
	}
	calculateCenterOfMass(){

	}

	claculateMaxColliderDist(){
		let maxColliderDist = 0;
		for (circle in this.circles){
			if(f.v.mag(circle) + circle[2] > maxColliderDist){
				maxColliderDist = f.v.mag(circle) + circle[2];
			}
		}
		for (point in this.points){
			if(f.v.mag(point) > maxColliderDist){
				maxColliderDist = f.v.mag(point);
			}
		}
		this.maxColliderDist = maxColliderDist;
		return maxColliderDist;
	}
	quickContains(obj){
		return (this.maxColliderDist + obj.maxColliderDist > f.v.mag(f.v.subtract(obj.pos, this.pos)));
	}

	// contains for cavities as well
	containsPoint(pos){
		for (circle in this.circles){
			if (f.v.mag(f.v.difference(f.v.add(this.pos,[circle[0], circle[1]]), pos)) < circle[2]){
				return true;
			}
		}
		// check if in poly
		let intersections = 0;
		for (let i = 0; i < this.points.length; i++){
			let pt1 = f.v.rotate(this.points[i],this.theta);
			let pt2 = f.v.rotate(this.points[(i < this.points.length - 1)? i + 1: pts - this.points.length],this.theta);
			if(f.geometry.lineContainsPoint(pt1,pt2,pos,true)){
				intersections++;
			}
		}
		if(intersections >= 1){
			intersections = 0;
			for (let i = 0; i < this.points.length; i++){
				let pt1 = f.v.rotate(this.points[i],this.theta);
				let pt2 = f.v.rotate(this.points[(i < this.points.length - 1)? i + 1: pts - this.points.length],this.theta);
				if(f.geometry.lineContainsPoint(pt1,pt2,pos,false)){
					intersections++;
				}
			}
		}
		else return false;

		return intersections >= 1; // 1 for strict edge inclusion, 2 for not included
	}
	inside(obj){
		return this.containsPoint(obj.pos) || obj.containsPoint(this.pos); // checks if obj is completely inside this
	}
	contains(obj, mode = false){ // need to check for circle collisions
		if(!this.quickContains(obj)){ // optimization
			return false;
		}
		/* cheater method: don't use
		if(this.inside(obj) || obj.inside(this)){
			return true;
		}*/

		// check line:line
		if(mode){ // by checking point enclosure
			for(let i = 0; i < obj.points.length; i++){
				if(this.containsPoint(obj.worldPoint(obj.points[i]))){
					return true;
				}
			}
			if(!bool){
				for(let i = 0; i < this.points.length; i++){
					if(obj.containsPoint(this.worldPoint(this.points[i]))){
						return true;
					}
				}
			}
		} else { // by checking line intersections
			for(let i = 0; i < this.points.length; i++){
				let i2 = (i < this.points.length - 1)? i + 1: i - this.points.length;
				for(let e = 0; i < this.points.length; e++){
					let e2 = (i < obj.points.length - 1)? e + 1: e - obj.points.length;
					if(f.geometry.lineIntersects(this.worldPoint(this.points[i]), this.worldPoint(this.points[i2]),
												obj.worldPoint(obj.points[e]),obj.worldPoint(obj.points[e2]))){
						return true;
					}
				}
			}
		}

		// check circle:circle
		for(let i = 0; i < this.circles.length; i++){
			for(let c = 0; c < obj.circles.length; c++){
				if(f.geometry.circleIntersectsCircle(obj.worldCircle(i), this.worldCircle(c))){
					return true;
				}
			}
		}
		for(let i = 0; i < obj.circles.length; i++){
			for(let c = 0; c < this.circles.length; c++){
				if(f.geometry.circleIntersectsCircle(this.worldCircle(i), obj.worldCircle(c))){
					return true;
				}
			}
		}

		// check circle:line
		for(let i = 0; i < this.points.length; i++){
			let i2 = (i < this.points.length - 1)? i + 1: i - this.points.length;
			for(let c = 0; c < obj.circles.length; c++){
				if(f.geometry.circleIntersectsLine(this.worldPoint[i],this.worldPoint[i2],obj.worldCircle[c])){
					return true;
				}
			}
		}
		for(let i = 0; i < obj.points.length; i++){
			let i2 = (i < obj.points.length - 1)? i + 1: i - obj.points.length;
			for(let c = 0; c < this.circles.length; c++){
				if(f.geometry.circleIntersectsLine(obj.worldPoint[i],obj.worldPoint[i2],this.worldCircle[c])){
					return true;
				}
			}
		}

		return false;
	}
	get area(){
		return 5;
		// area of points   -   area of cavities inside points
	}

	worldCircle(c){
		if(typeof pt == Number){ // pt not defined
			c = this.circles[c];
		}
		let tmp = this.worldPoint(c);
		return [tmp[0],tmp[1],c[2]];
	}
	toWorldCircle(c){
		return this.worldCircle(c);
	}

	get volume(){ return Math.PI * (4/3) * Math.power(this.r, 3);}
	get r(){ return Math.sqrt(this.area / Math.PI);} // imaginary + auxiliary radius formation
	get radius(){ return Math.sqrt(this.area / Math.PI);}
	get A(){ return this.area;}
	get sa(){ return this.A; }
	get surfaceArea(){ return this.sa;}
	get frontSurfaceArea(){ return this.sa;} // for wind resistenc f(v)
	get m(){ return this.density * this.volume;}

	update(){
		this.vx = this.nextVx;
		this.vy = this.nextVy;

		super.update();
	}
	postUpdate(gw = null,gh=null){
		// polish
		super.update(); // standard discrete updates

		if(gh != null && gw != null){
			f.setInBox(this,w,h);
		}
	}
  draw (display) {
		// draw

		// let ctx = display.ctx;
		display.drawCircle(this.x + (.5 * this.r),this.y + (.5 * this.r),this.r);
    
  }
}


class SmoothBodyCollider extends Collider2D { // elasticity between 2 connected points (angle and dist)
  constructor(x = 0, y = 0, vx = 0, vy = 0, theta = 0, av = 0, pts = f.geometry.shape.square(), circles = [], density = 1, springConstant = .5, rotationalSpringConstant = springConstant) {
    super(x, y, vx, vy, theta, av, pts, circles, density);
  }
  //points are rigidbodies with spring joints
}
class JointedBodyCollider extends Collider2D { // elasticity between 2 connected points (angles only) dist is approx. constant
  constructor(x = 0, y = 0, vx = 0, vy = 0, theta = 0, av = 0, pts = f.geometry.shape.square(), circles = [], density = 1, springConstant = .5, rotationalSpringConstant = springConstant) {
    super(x, y, vx, vy, theta, av, pts, circles, density);
  }
  //points are rigidbodies with spring joints
}
class SoftBodyCollider extends Collider2D { // elasticity between point & pos
  constructor(x = 0, y = 0, vx = 0, vy = 0, theta = 0, av = 0, pts = f.geometry.shape.square(), circles = [], density = 1, springConstant = .5) {
    super(x, y, vx, vy, theta, av, pts, circles, density);
  }
  //points are rigidbodies with spring joints
}
class RigidBodyCollider extends Collider2D { // adds material properties: ex: bounciness via// inelastic collisions
  constructor(x = 0, y = 0, vx = 0, vy = 0, theta = 0, av = 0, pts = f.geometry.shape.square(), circles = [], density = 1, bounciness = 0) {
    super(x, y, vx, vy, theta, av, pts, circles, density);
  }
  // add collision bounciness
}

// IMPLEMENT BELOW AS AN ADDITION TO GAMEOBJECT var connections[]
//class CONNECTION
// joints[] in GameObject
class ConnectableGameObject extends GameObject{ // not a class, instead a function or a class with the object as a variable??
	constructor(x = 0,y = 0,pts = [], circles = [],vx = 0,vy = 0, theta = 0, av=0, density = 1, attachedJoint = null, tempDist = 1, thisOffX=0, thisOffY=0, attOffX=0, attOffY=0, relativeAngle = 0,breakForce = Infinity, breakTorque = Infinity, springConstant = Infinity, rotationalSpringConstant = 0, rotational_coefficient_of_friction = 0) {
		super(x,y,pts,circles,vx,vy,theta,av,density,collider);
		this.attachedJoint = attachedJoint;
		this.distanceToJoint = tempDist;

		this.breakForce = breakForce;
		this.breakTorque = breakTorque;

		this.springConstant = springConstant;
		this.rotationalSpringConstant = rotationalSpringConstant;

		this.rotational_coefficient_of_friction = rotational_coefficient_of_friction;

		this.relativeAngle = relativeAngle; // counter clockwise from -->

		this.pivotXOffset = attOffX;
		this.pivotYOffset = attOffY;
		this.thisXOffset = thisOffX;
		this.thisYOffset = thisOffY;
	}
	get k(){ return this.springConstant; }
	get distance(){ return this.distanceToJoint;}
	get dist(){ return this.distanceToJoint;}
	get length(){ return this.distanceToJoint;}
	get maxForce(){ return this.breakForce;}
	get maxForce(){ return this.breakTorque;}
	get pivot(){ return this.attachedJoint; }
	get connected(){
		return this.attachedJoint != null && this.attachedJoint != undefined;
	}
	get distanceVector(){
		let thisRotatedOffset = f.v.rotate([this.thisOffX, this.thisOffY], this.theta);
		let pivotRotatedOffset = f.v.rotate([this.pivotXOffset, this.pivotXOffset], this.attachedJoint.theta);
		return f.v.subtract([this.pos[0] + thisRotatedOffset[0],this.pos[1] + thisRotatedOffset[1]], [this.attachedJoint.pos[0] + pivotRotatedOffset[0], this.attachedJoint.pos[1] + pivotRotatedOffset[1]]);
	}
	applyNormalForce(){
		let normalForce = f.v.multiply( f.v.project([-ax,-ay], f.v.vectorTo(this.pos, this.attachedJoint.pos)), this.mass);
		this.applyForce(normalForce[0], normalForce[1]);
		if(f.v.mag(normalForce) > this.maxForce){
			this.attachedJoint = null;
			console.log("connection broken");
		}
	}
	addNormalForce = this.applyNormalForce;
	addTorque(torque){
		this.addForce(0,1,torque/2, 0);
		this.addForce(0,-1,-torque/2, 0);
	}
	applyTorque = this.addTorque;
	preUpdate(ww = Infinity,wh = Infinity, wcenterx = 0, wcentery = 0){
		super.preUpdate();

		let tempForceValues = this.forces;

		if(this.connected){
			if( ! f.exists(this.springConstant)){
				if(this.distanceToJoint > this.distanceVector(this.attachedJoint, this)){
					this.applyNormalForce();
				}
			} else {
				let springForce = - this.springConstant * this.distanceVector(a,b,ww,wh,wcenterx,wcentery);
				this.applyForce(f.v.multiply(f.v.normalize([this.x + this.thisXOffset - this.attachedJoint.x - this.pivotXOffset,
											 this.y + this.thisYOffset - this.attachedJoint.y - this.pivotYOffset]), springForce));
			}
		}
		if(this.connected){
			if(f.exists(this.rotationalSpringConstant) && f.exists(this.relativeAngle)){
				let torque = this.rotationalSpringConstant * (this.relativeAngle - this.angle);
				this.applyTorque(torque);
				if(this.breakTorque < this.forces[2] * this.inertia){
					this.attachedJoint = null;
				}
			}
			else{

			}
		}
		if(this.connected){
			if(f.exists(this.rotational_coefficient_of_friction)){
				let tempTorque2 = f.v.mag(f.v.multiply(f.v.project([tempForceValues[0],tempForceValues[1]], this.distanceVector[0], this.distanceVector[1]) , this.rotational_coefficient_of_friction));

				if(Math.abs(tempForceValues[2]) < Math.abs(tempTorque2)){
					this.applyTorque(-tempForceValues[2]);
				} else {
					this.applyTorque(- Math.sign(tempForceValues[2]) * Math.abs(tempTorque2));
				}
			}
		}
	}
	update() {
	// collide, addforces, applyforces and dv, dp
		if(f.v.vectorDistance(ax,ay) > this.maxForce){
			this.attachedJoint = null;
		}

		super.update();
	}
	postUpdate(ww = Infinity,wh = Infinity, wcenterx = 0, wcentery = 0){
		super.postUpdate(ww,wh,wcenterx,wcentery);
		if(this.connected){
			if(f.exists(this.rotationalSpringConstant) || f.exists(this.rotational_coefficient_of_friction)){
				// relative (aka: super fixed w. rotation)
				this.pos = f.v.add(f.v.add(f.v.rotate([this.thisOffX, this.thisOffY], this.theta), f.v.rotate([this.pivotXOffset, this.pivotYOffset],this.attachedJoint.theta)), this.attachedJoint.pos);
			}
			else if(!f.exists(this.springConstant)){
				// fixed (distance)
				this.pos = f.v.project([this.x,this.y], this.distanceVector);
			}

		}
		super.postUpdate(ww,wh,wcenterx,wcentery);
	}
	draw(display){
		super(display);
	}
};