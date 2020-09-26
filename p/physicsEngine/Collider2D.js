// no rigid, only soft bodies!!!
class Collider2D { // hollow colliders as cavity points??? like points[point[x,y]] then cavities[cavity[points[point[x,y]]]]
	constructor(pts = f.geometry.shape.square(),circles = [], rigidbody = null) {
		this.rigidbody = rigidbody;
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

		this.area = this.setArea();
		this.volume = this.setVolume();
		this.maxColliderDist = this.calculateMaxColliderDist();
	
		this.relativeCenterOfMass = this.calculateRelativeCenterOfMass();
		
		this.integralDistanceSquared = this.calculateIntegralDistanceSquared();

		this._electricCenterOfMass = null;
	}
	get electricCenterOfMass(){
		return (_electricCenterOfMass == null)? this.com:this._electricCenterOfMass;
	}
	set electricCenterOfMass(v){ this._electricCenterOfMass = v;}

	get rcom(){ return this.relativeCenterOfMass;}
	get com(){ return this.centerOfMass;}
	get centerOfMass(){
		return f.subtract(f.rotate(this.relativeCenterOfMass, this.transform.theta) ,this.transform.pos);
	}
	calculateRelativeCenterOfMass(){ // Unfinished
		return [0,0];
	}
	setArea () {
		this.area = ?
		return 5;
	}
	
	get vol(){return this.volume()}
	setVolume () {
		this.volume = ?
		return 5;
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
	calculateIntegralDistanceSquared(){
		// inertia = mass * IntegralDistanceSquared
		// from com
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
// pressure on edge distributed to surrounding points
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
