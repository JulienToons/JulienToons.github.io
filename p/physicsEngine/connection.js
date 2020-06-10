

// IMPLEMENT BELOW AS AN ADDITION TO GAMEOBJECT var connections[]
//class CONNECTION
// joints[] in GameObject
class Connection{ // not a class, instead a function or a class with the object as a variable??
	constructor(transform, rigidbody,collider,attachedJoint = null, tempDist = 1, thisOffX=0, thisOffY=0, attOffX=0, attOffY=0, relativeAngle = 0,breakForce = Infinity, breakTorque = Infinity, springConstant = Infinity, rotationalSpringConstant = 0, rotational_coefficient_of_friction = 0) {
		this.transform=transform;
		this.collider =collider;
		this.rigidbody = rigidbody; // effective, no, satisfactory, definitely

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