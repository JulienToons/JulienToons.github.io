/*
Class Tree: Position, StrictTransform, Transform
COMPLETE: no
TODO: fake private vars should be made private by either pointers or keys
EXTRA: acceleration & lockAcceleration

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
  set vector(v) { this.v(v); }

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