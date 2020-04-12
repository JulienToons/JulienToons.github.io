const Game = function (w, h) {
  this.world = new Game.World(w, h);
  this.update = function (t = 0) {
    this.world.update();
  };
};
Game.prototype = { constructor: Game };


Game.World = function (w = 1000, h = 1000, cs=.2) {
  this.height = h;
  this.width = w;
  this.camera = cs; // temp store size then set to camera class instance
  this.gravity = g;

	this.objects = [];
  this.user = null; // player contains string and hammer
};
Game.World.prototype = {

	constructor: Game.World,

	setup:function() {
		console.log("Julien Owhadi's Physics Engine vALPHA 1.1");
		this.camera = new Game.Camera(0,0,this.camera);

		let boundingSafetyVar = 40;
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

class GameObject{ // with rudimentary physics & colliders
	constructor(col,id = null,type = null){
		this.col = col;
		this.connections = [];

		this.id = id;
		this.type = type;
	}

	set collider(v){ this.col = v; }
	get collider(){ return this.col; }
	set transform(v){ this.col = v; }
	get transform(){ return this.col; }

	addConnection(){
		this.connections.push(/* */);
	}
	set joints(v){ this.connections = v; }
	get joints(){ return this.connections; }
}


class f{ // static helper functions
	static get epsilon(){ return .001; }
	static exists(a){
		return a != null && a != undefined && isFinite(a); // foolproof
	}
	static toDeg(a){
		return a * 180 /Math.PI;
	}
	static toRad(a){
		return a * Math.PI / 180;
	}
	static random(a,b = null){
		if(f.exists(b)){
			return a + Math.random() * (b-a);
		}
		else {
			return a*Math.random();
		}
	}
	static rand(a,b=null){return this.random(a,b);}

	/* needless! begone!
	static pointer = { // my makeshift flipping pointing scapegoat which is actudally just a storage handler & an accessor for pointers
		// maybe add security & private/protected variables later on
		get out(){

		},
		set in(){

		},
		pointers: []
	}
	*/
	/*static insanePointer = { // dumb idea... might continue later on
		// just a slightly more secure version of f.pointer
		pointers: [],
		get out(){

		},
		set in(){

		},
		mode:"standard",
		encrypt:function(value, method="standard", key = null, bounds = Infinity){ // an Integer

			method = method.toLowerCase();

			let crypt = null;

			switch method(){
				case "standard":
					crypt = value + 3;
					break;
				case "shift":
					crypt =  key + value;
					break;
				case "complex":
					crypt = value + 1; // todo
					break;
				default: // no encryption
					crypt = value;
			}

			if(!f.exists(bounds)) {
				crypt%=bounds;
			}

			return crypt;

		},
		decrypt:function(){

		}
	}*/

	static setInBox(pos, ...args){ // make sure position is in game world
		let x,y,w,h;
		if(args.length == 2){
			x = 0;
			y = 0;
			w = args[0];
			h = args[1];
		} else if (args.length == 4){
			x = args[0];
			y = args[1];
			w = args[2];
			h = args[3];
		} else {
			console.error("FAIL: setInBox function takes 3 or 5 parameters");
			return -1;
		}

		if(!f.exists(pos.length)){
			if (pos.x < x){
				pos.x =x;
			}
			if (pos.x > x+w){
				pos.x =x+w;
			}
			if (pos.y < y){
				pos.y =y;
			}
			if (pos.y < y+h){
				pos.y =y;
			}
		} else {
			if (pos[0] < x){
				pos[0] =x;
			}
			if (pos[0] > x+w){
				pos[0] =x+w;
			}
			if (pos[1] < y){
				pos[1] =y;
			}
			if (pos[1] < y+h){
				pos[1] =y;
			}
			return pos;
		}
	}

	static v = class v{ // vector 2d functions
		static normalize(v){
			let m = this.mag(v);
			return [v[0]/m, v[1]/m];
		}
		static normal(theta){
			return [Math.cos(theta), Math.sin(theta)];
		}

		static multiply (v, m){ return [v[0] * m, v[1] * m];}
		static mult (v, m){ return [v[0] * m, v[1] * m];}

		static mag(v){ return this.vectorDistance(v[0],v[1]);}
		static dist(v){ return this.vectorDistance(v[0],v[1]);}
		static distance(v){ return this.vectorDistance(v[0],v[1]);}
		static vectorDistance(x,y){
			return Math.sqrt((x*x)+(y*y));
		}

		static add(a,b){ // 2d vectors only
			return [a[0] + b[0], a[1] + b[1]];
		}
		static addition(a,b){ return this.add(a,b); }

		static difference(a,b){
			return [a[0] - b[0], a[1] - b[1]];
		}
		static subtract(a,b){ return this.difference(a,b);}
		static subtraction(a,b){ return this.difference(a,b);}

		static project(vector, b){ // v onto b
			let mag = Math.dot(vector, b) / Math.dot(b,b);
			let c = [b[0] * mag, b[1] * mag];
			return c;
			// Math.sqrt(Math.dot(vector) - Math.dot(b));
		}
		static proj(v,b){ return this.project(v,b);}

		static projectAngle(vector, theta){
			// theta counterclockwise from --->
			return project(vector, [Math.cos(theta), Math.sin(theta)]);
		}

		static rotate(v, theta) {
			return [v[0] * Math.cos(theta) - v[1] * Math.sin(theta), v[0] * Math.sin(theta) + v[1] * Math.cos(theta)];
		}
		static rotateXY(x,y,t){
			return this.rotate([x,y],t);
		}
	}

	static geometry = class geometry{
		static lineContainsPoint(pt1,pt2,pt3, mode = true){
			// extend vert/hor ray through pt3 and check if it passes through the line (pt1,pt2)
			if (mode = true || mode == "vert" || mode == "vertical"){ // vertical ray
				return (pt1[0] < pt3[0] && pt2[0] > pt3[0]) || (pt1[0] > pt3[0] && pt2[0] < pt3[0]);
			} else { // horizontal ray
				return (pt1[1] < pt3[1] && pt2[1] > pt3[1]) || (pt1[1] > pt3[1] && pt2[1] < pt3[1]);
			}
		}
		static triangulate(points, ...args){ // unnecessary

		}
		static centerOfTriangle(){

		}
		static center(points){
			let triangles = this.triangulate(points);
			for (t in triangles){
				// center of triangle with respect to area
				// should make one with respect to volume...
			}

			return crypt;

		}
		static isPointOnLine(a1,a2, b) {
			let aTmp = [a2[0] - a1[0], a2[1] - a1[0]];
			let bTmp = [b[0] - a1[0], b[1] - a1[1]];
			let r = Math.cross(aTmp, bTmp);
			return Math.abs(r) < f.EPSILON;
		}
		static doBoundingBoxesIntersect(a1,a2,b1,b2){
			let aMin = [Math.min(a1[0],a2[0]), Math.min(a1[1],a2[1])];
			let aMax = [Math.max(a1[0],a2[0]), Math.max(a1[1],a2[1])];
			let bMin = [Math.min(b1[0],b2[0]), Math.min(b1[1],b2[1])];
			let bMax = [Math.max(b1[0],b2[0]), Math.max(a1[1],b2[1])];
			return (aMin[0] <= bMax[0] && aMax[0] >= bMin[0] && aMin[0] <= bMax[1] && aMax[1] >= bMin[1]);
		}
		static isPointRightOfLine(a1,a2,b) {
			let aTmp = [a2[0] - a1[0], a2[1] - a1[0]];
			let bTmp = [b[0] - a1[0], b[1] - a1[1]];
			return Math.cross(aTmp, bTmp) < 0;
		}
		static lineSegmentTouchesOrCrossesLine(a,b) { // a and b are lines
			return isPointOnLine(a[0],a[1], b[0])
					|| isPointOnLine(a[0],a[1], b[1])
					|| (isPointRightOfLine(a[0],a[1], b[0]) != isPointRightOfLine(a[0],a[1], b[1])); // != is actually ^ in java
		}
		static lineIntersects(...args){ // intersects another line segment
			let p1, q1, p2,q2;
			if(args.length == 2){
				p1 = args[0][0];
				q1 = args[0][1];
				p2 = args[1][0];
				q2 = args[1][1];
			} else if(args.length == 4){
				p1 = args[0];
				q1 = args[1];
				p2 = args[2];
				q2 = args[3];
			} else {
				console.error("Inappropriate parameter length: p.l == 2 or 4");
				return -1;
			}
			/*
			if(this.doBoundingBoxesIntersect([p1,q1],[p2,q2])){
				// do stuff
			}
			Point[] box1 = a.getBoundingBox();
			Point[] box2 = b.getBoundingBox();
			return doBoundingBoxesIntersect(box1, box2)
					&& lineSegmentTouchesOrCrossesLine(a, b)
					&& lineSegmentTouchesOrCrossesLine(b, a);*/

			let v1 = [p1[0]-p2[0], q1[1]-p2[1]]; // oa
			let v2 = [q1[0]-p2[0], q1[1]-p2[1]]; // ob
			let v3 = [q2[0]-p2[0], q2[1]-p2[1]]; // om
			let v4 = [q2[0]-p1[0], q2[1]-p1[1]]; // am
			let v5 = [q1[0]-p1[0], q1[1]-p1[1]]; // ab

			// Calculate point M' = M mirrored by AB
			let abLengthSq = v5[0] * v5[0] + v5[1] * v5[1]; // AB • AB
			let abDam = v5[0] * v4[0] + v5[1] * v4[1]; // AB • AM
			v5[0] *= 2 * (1 / abLengthSq) * abDam;
			v5[1] *= 2 * (1 / abLengthSq) * abDam;
			v5[0] -= v4[0];
			v5[1] -= v4[1];
			v5[0] += v1[0]; // v5 now holds vector OM'
			v5[1] += v1[1];

			let omLengthSq = v3[0] * v3[0] + v3[1] * v3[1]; // OM • OM
			let omMirroredLengthSq = v5[0] * v5[0] + v5[1] * v5[1]; // OM' • OM'
			if (omMirroredLengthSq > omLengthSq){ return false;} // mirrored M is farther (on opposite side of/above AB) than M

			if (omMirroredLengthSq == omLengthSq) { // M == M'? => M on line that goes through AB
				if (v1[0]/v3[0] == v1[1]/v3[1]) {// OA || OM ? => All four points lay on same line
					// inefficient but rarely called on
					// let rectAB = [Math.min(p1[0], q1[0]), Math.max(p1[1],q1[1]), Math.max(p1[0],q1[0]), Math.min(p1[1],q1[1])];
					// let rectOM = [Math.min(p2[0], q2[0]), Math.max(p2[1],q2[1]), Math.max(p2[0],q2[0]), Math.min(p2[1],q2[1])];

					//return rectAB.intersect(rectOM);
					return this.doBoundingBoxesIntersect(p1,q1,p2,q2);
				}
			}

			// Otherwise point M is "above" line A-B, we need to test if its obscured
			// Test: sign(v1 x v3) == sign(v3 x v2)
			let crossV1V3 = v1[0]*v3[1] - v1[1]*v3[0];
			let crossV3V2 = v3[0]*v2[1] - v3[1]*v2[0];
			return (crossV1V3 < 0) == (crossV3V2 < 0);

		}
		static circleIntersectsCircle(a,b){// [x,y,r],[x,y,r]
			return Math.abs(f.v.mag(f.v.sub(b,a))) < Math.max(a[2],b[2]);
		}
		static circleIntersectsLine(a,b,c){
			let ab = f.v.mag(f.v.sub(a,b));
			let bc = f.v.mag(f.v.sub(c,b));
			let ca = f.v.mag(f.v.sub(a,c));

			let slope = (b[0] - a[0]) / (b[1] - a[1]); // flipped across y=x
			if( c[1] >= (slope * c[0]) + a[1] - (a[0] * slope) ){
				return f.v.mag(f.v.sub(c,a)) <= c[2];
			} else if( c[1] <= (slope * c[0]) + b[1] - (b[0] * slope) ){
				return f.v.mag(f.v.sub(c,b)) <= c[2];
			} else {
				return ca * Math.sqrt(1 - ((Math.pow(ca,2) + Math.pow(bc,2) - Math.pow(ab,2)) / (2 * ca * bc)) );
			}
		}
		static lineIntersectsCircle(...args){
			return circleIntersectsLine(...args);
		}

		static shape = class shape{

			static image(img){
				return this.img(img);
			}
			static img(img){ // or create an Image Editor for Admin
				// createPointsAndOrOrCirclesFromImage
				return [];
			}

			static square(r = 1){ // max dist from center to point
				return this.polygon(4,r);
			}
			static strictSquare(d = 1){ // min dist from center to middle of a line
				return this.strictPolygon(4,d);
			}

			static poly(pts = 3, r = 1){ return this.polygon(pts,r); }
			static polygon(pts = 3, r = 1){ // max dist from center to point
				let points = [];
				for (let i = 0; i < pts; i++){
					points.push([r * Math.cos((Math.PI/2) + (i * Math.PI * 2/pts)), r * Math.sin((Math.PI/2) + (i * Math.PI * 2/pts))]);
				}
				return points;
			}
			static strictPoly(pts = 3, d = 1){ return this.strictPolygon(pts,d); }
			static strictPolygon(pts = 3, d = 1){ // min dist from center to middle of a line
				return this.polygon(pts, d * Math.cos(Math.PI/pts));
			}
		}
	}

	static inflictResistance(obj, constant = 1){ // i forgot what this does
		let m = -.5 * obj.density * this.v.mag(obj.v) * this.v.mag(obj.v) * obj.frontSurfaceArea;
		obj.applyForce(this.v.multiply(this.v.normalize(obj.v), m));
	}
	static inflictGravitationalForce(a,b,g = 1,ww = Infinity, wh = Infinity, wx = 0, wy = 0){ // g = gravitational constant
		let d = dis(a,b, ww,wh,wx,wy);
		let f =  g * a.m * b.m / (d * d);

		b.applyForce((a.x - b.x) * f/ d, (a.y - b.y) * f/d);
		a.applyForce((b.x - a.x) * f/ d, (b.y - a.y) * f/d);
	}
	static inflictBuoyantForce(a, density = 1, gravity = 1){
		a.applyForce(0, - a.voulume * density * gravity);
	}
	static KE(mass, velocity){ // kinetic energy
		return .5 * mass * velocity * velocity;
	}
	static simpInertia(mass,area){
		return .4 * mass * area / Math.PI;
	}
	static dis(a,b, ww = Infinity, wh = Infinity, wx = 0, wy = 0){ // no looped world
		let dx = Math.min(a.x - b.x, a.x -  (b.x + (ww/2) - wx));
        let dy = Math.min(a.y - b.y, a.y - b.y);
        return Math.sqrt(dx * dx + dy * dy);
	}
	static distance(a,b,ww = Infinity, wh = Infinity, wx = 0, wy = 0){return dis(a,b,ww,wh,wx,wy);}
	static dist(a,b,ww = Infinity, wh = Infinity, wx = 0, wy = 0){return dis(a,b,ww,wh,wx,wy);}

	static col(a,b){f.elasticCollision(a,b);} // need collison with forces
	static indirectCollision(a,b){// with rotation but not points?

	}
	static elasticCollision(a,b){ // change to nextVelocity
		let tempX = (a.m * a.vx) + (b.m * b.vx) - (a.m * a.vx)
		tempX = tempX/b.m;
		tempX = f.KE(a.m,a.vx) + f.KE(b.m,b.vx) - f.KE(b.m,tempX);
		tempX = 2 * Math.sqrt(.5 * tempX) / a.m;

		let tempY = (a.m * a.vy) + (b.m * b.vy) - (a.m * a.vy)
		tempY = tempY/b.m;
		tempY = f.KE(a.m,a.vy) + f.KE(b.m,b.vy) - f.KE(b.m,tempY);
		tempY = 2 * Math.sqrt(.5 * tempY) / a.m;

		let tempX2 = f.KE(a.m,a.vx) + f.KE(b.m,b.vx) - f.KE(b.m,tempX);
		tempX2 = 2 * Math.sqrt(.5 * tempX) / a.m;

		let tempY2 = f.KE(a.m,a.vy) + f.KE(b.m,b.vy) - f.KE(b.m,tempY);
		tempY2 = 2 * Math.sqrt(.5 * tempY) / a.m;

		a.vx = tempX;
		a.vy = tempY;
		b.vx = tempX2;
		b.vy = tempY2;
	}
	static inelasticCollision(a,b, wantedVx, wantedVy){ // wanted for this object // change to nextVelocity
		let tempVx = (a.m * a.vx) + (b.m * b.vx) - (a.m * wantedVx);
		let tempVy = (a.m * a.vy) + (b.m * b.vy) - (a.m * wantedVy);

		a.vx = (a.m * a.vx) + (b.m * b.vx) - (b.m * tempVx);
		a.vy = (a.m * a.vy) + (b.m * b.vy) - (b.m * tempVy);

		b.vx = tempVx;
		b.vy = tempVy;
	}
	static vectorCollision(a,b){ // change to nextVelocity
		var m1 = a.mass
		var m2 = b.mass
		var theta = -Math.atan2(b.y - a.y, b.x - a.x);
		var v1 = f.v.rotate(a.v, theta);
		var v2 = f.v.rotate(b.v, theta);
		var u1 = f.v.rotate([v1[0] * (m1 - m2)/(m1 + m2) + v2[0] * 2 * m2/(m1 + m2), v1[1]], -theta);
		var u2 = f.v.rotate([v2[0] * (m2 - m1)/(m1 + m2) + v1[0] * 2 * m1/(m1 + m2), v2[1]], -theta);

		a.vx = u1[0];
		a.vy = u1[1];
		b.vx = u2[0];
		b.vy = u2[1];
	}
};


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
		super.update();
		// execute with t = 1 frame
		let forceValuesTemp = this.avgForce;
		this.vx += forceValuesTemp[0];
		this.vy += forceValuesTemp[1];
		this.omega += forceValuesTemp[2];
	}
	postUpdate(){
		this.forces.clear();
	}

};

class Collider2D extends RigidBody2D{
	constructor(x = 0,y = 0,vx = 0,vy = 0, theta = 0, av=0 ,pts = f.geometry.shape.square(),circles = [],density = 1) {
		super(x,y,vx,vy,theta, av, density);

		this.pts = pts;
		this.circles = circles;

		this.nextVx = vx;
		this.nextVy = vy;

		this.maxColliderDist = this.calculateMaxColliderDist();
	}
	collide(obj){
		if(this.contains(obj)){
			// elasticCollision
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
		if(!this.quickContains(obj)){
			return false;
		}
		if(this.inside(obj) || obj.inside(this)){
			return true;
		}

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
	}

	worldCircle(c){
		if(typeof pt == Number){
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
class RigidBodyCollider extends Collider2D { // adds material properties: ex: bounciness via inelastic collisions
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