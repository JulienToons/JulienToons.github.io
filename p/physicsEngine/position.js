/*
Class Tree: Position, StrictTransform, Transform
COMPLETE: yes
Wishlist: fake private vars should be made private by either pointers or keys
Rework: added super position
*/
class Position {
  constructor(x, y, lockx = false, locky=false) {
    this._x = x;
    this._y = y;
    this.lockX = lockx;
    this.lockY = locky;
  }

  get x(){ return this._x;} // private implementation for locking mechanisms
  set x(a){ if(this.lockX){this._x = a;}}

  get y(){ return this._y;}
  set y(a){ if(this.lockY){this._y = a;}}

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
  constructor(x, y, vx, vy, lockVx = false, lockVy = false) {
    super(x, y);
    this._vx = vx;
    this._vy = vy;
    this.lockVx = lockVx;
    this.lockVy = lockVy;
  }
  get vx (){ return this._vx;}
  set vx(a){ if(this.lockVx){this._vx = a;}}
  get vy(){ return this._vy;}
  set vy(a){ if(this.lockVy){this._vy = a;}}

  get v() { return [this.vx, this.vy]; }
  set v(v) {
    this.vx = v[0];
    this.vy = v[1];
  }
  get vector() { return this.v(); }
  set vector(v) { this.v = v; }

  update() {
    this.x += this.vx;
    this.y += this.vy;
  }
};
class Transform extends StrictTransform {
  constructor(x = 0, y = 0, vx = 0, vy = 0, theta = 0, av = 0) {
    super(x, y, vx, vy);
    this._angle = theta; // in radians counterclockwise from --> (rotated across the z-axis)
    this.lockA = false;
    this._angularVelocity = av;
    this.lockAv = false;
  }
  get lockAngle(){return this.lockA;  }
  set lockAngle(a){this.lockA = a;}
  get angle(){ return this._angle;} // private implementation for locking mechanisms
  set angle(a){ if(this.lockA){this._angle = a;}}

  get lockAnglularVelocity(){return this.lockAv;  }
  set lockAnglularVelocity(a){this.lockAv = a;}
  get angularVelocity(){ return this._angularVelocity;} // private implementation for locking mechanisms
  set angularVelocity(a){ if(this.lockAv){this._angularVelocity = a;}}

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
class SuperTransform extends Transform{ // allows for temporary (next variables)
  constructor(x = 0, y = 0, vx = 0, vy = 0, theta = 0, av = 0) {
    super(x, y, vx, vy, theta,av);
    this.nx=x;
    this.ny=y;
    this.nvx=vx
    this.nvy=vy;
    this.nangle=theta;
    this.nav=av;
  }
  update(){
    super.update();
    this.x=this.nx;
    this.y=this.ny;
    this.nvx=this.xy;
    this.angle=this.nangle;
    this.av=this.nav;
  }
  get nPos() { return [this.nx, this.ny]; }
  set nPos(pos) {
    this.nx = pos[0];
    this.ny = pos[1];
  }
  get nposition() { return [this.px, this.py]; }
  set nposition(pos) {
    this.nx = pos[0];
    this.ny = pos[1];
  }
  get nextpos() { return [this.px, this.py]; }
  set nextpos(pos) {
    this.px = pos[0];
    this.py = pos[1];
  }
  get nextposition() { return [this.px, this.py]; }
  set nextposition(pos) {
    this.px = pos[0];
    this.py = pos[1];
  }
  get nv() { return [this.nvx, this.nvy]; }
  set nv(v) {
    this.nvx = v[0];
    this.nvy = v[1];
  }
  get nvector() { return this.nv(); }
  set nvector(v) { this.nv(v); }

  get nangularVelocity(){ return this.nav;} // private implementation for locking mechanisms
  set nangularVelocity(a){ this.nav=a;}

  get ntheta() {
    return this.nangle;
  }
  set ntheta(t) {
    this.nangle = t;
	}
	get nangleInDeg(){ 
		return f.toDeg(this.ntheta);
	};
	set nangleInDeg(t){ 
		this.ntheta =  f.toRad(t);
	};
  get nomega() {
    return this.nav;
  }
  set nomega(x) {
    this.nav = x;
  }
}