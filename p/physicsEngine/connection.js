
// joints[] in GameObject
// connection acts as a joint
// purely custom joints
// maybe not a component of a gameobj?
// magnetic wire forces!!!!

// CHANGE transform to base.transform

// use real constants!!!! 1m = 1pixel

// ADD MOTORS! for rotation only
class Connection{ // not a class, instead a function or a class with the object as a variable??
	constructor(base,attachedObj = null, tempDist = 1, supposedPosition = [0,0], thisOffX=0, thisOffY=0, attOffX=0, attOffY=0,
							linearBoundary = [0,Infinity], rotationalBoundary = [-Infinity,Infinity], relativeAngle = 0,breakForce = Infinity,
							breakTorque = Infinity, breakSpin = Infinity, springConstant = Infinity, rotationalSpringConstant = 0, spinSpringConstant = 0,
							spring_coefficient_of_friction = 0, rotational_coefficient_of_friction = 0, spin_coefficient_of_friction = 0, color = null,
							motor = { torque:1, friction: 0.2 /* T_f = v^? * f * c */, on:true,update:function(){this.torque = (this.torque) - (this.firction * w);} } ) {
		
		this.color = color; // none or line
		this.supposedPosition = supposedPosition; // the position of the hook relative to the pivot

		this.linearBoundary = linearBoundary; // radial boundary: magnitude dist limits
		this.rotationalBoundary = rotationalBoundary;

		{/*	Types of connections & joints:
				______________________________
				NINE JOINT TYPES

				distance from obj to this
				rotation (obj pos to this pos)
				spin (obj relative rotation to above)
				*
				fixed
				spring
				free [boundaries] (if hit boundary then obj & this velocity & pos redo)
				
				radial boundary
				______________________________

				fixedJoint (dist fixed, rotation fixed, spin fixed)
				pivotJoint (distance fixed, rotation free, spin fixed)
				rotationalSpringyPivotJoint (distance fixed, rotation spring, spin fixed)
				
				springJoint (spring dist, rotation fixed, spin fixed)
				doubleSpringedJoint (spring dist, rotation spring, spin fixed)
				springedPendulum (spring dist, rotation free, spin fixed)
				slider (free dist, rotation fixed, spin fixed)
				technicSlider (free dist, rotation spring, spin fixed)
				container-oneSpin (free dist, rotation free, spin fixed)

				m-fixedJoint (dist fixed, rotation fixed, spin spring)
				m-pivotJoint (distance fixed, rotation free, spin spring)
				m-rotational-springy pivot joint (distance fixed, rotation spring, spin spring)
				m-springJoint (spring dist, rotation fixed, spin spring)
				m-doubleSpringedJoint (spring dist, rotation spring, spin spring)
				m-springedPendulum (spring dist, rotation free, spin spring)
				m-slider (free dist, rotation fixed, spin spring)
				m-technicSlider (free dist, rotation spring, spin spring)
				container-springSpin (free dist, rotation free, spin spring)

				fixedJointBearing (dist fixed, rotation fixed, spin free)
				pivotJointBearing (distance fixed, rotation free, spin free)
				rotationalSpringyPivotJointBearing (distance fixed, rotation spring, spin free)
				springJointBearing (spring dist, rotation fixed, spin free)
				doubleSpringedJointBearing (spring dist, rotation spring, spin free)
				springedPendulumBearing (spring dist, rotation free, spin free)
				sliderBearing (free dist, rotation fixed, spin free)
				technicSliderBearing (free dist, rotation spring, spin free)
				container (free dist, rotation free, spin free)

		*/}
		
		this.base=base;

		this.attachedObj = attachedObj;
		this.distanceToObj = tempDist;

		this.breakForce = breakForce;
		this.breakTorque = breakTorque;
		this.breakSpin = breakSpin;

		this.springConstant = springConstant;
		this.rotationalSpringConstant = rotationalSpringConstant;
		this.spinSpringConstant = spinSpringConstant;

		this.rotational_coefficient_of_friction = rotational_coefficient_of_friction;
		this.spring_coefficient_of_friction = spring_coefficient_of_friction;
		this.spin_coefficient_of_friction = spin_coefficient_of_friction;

		this.relativeAngle = relativeAngle; // counter clockwise from o-->

		// offsets from pos not the center of mass
		this.pivotXOffset = attOffX;
		this.pivotYOffset = attOffY;
		this.thisXOffset = thisOffX;
		this.thisYOffset = thisOffY;
	}
	get k(){ return this.springConstant; }
	get k_l(){ return this.springConstant; }
	get k_r(){ return this.rotationalSpringConstant; }
	get k_s(){ return this.spinConstant; }
	get k_linear(){ return this.springConstant; }
	get k_rotational(){ return this.rotationalSpringConstant; }
	get k_spin(){ return this.spinConstant; }
	get distanceToObj(){ return f.v.magnitude(this.supposedPosition);}
	get distance(){ return this.distanceToObj;}
	get dist(){ return this.distanceToObj;}
	get length(){ return this.distanceToObj;}
	get maxForce(){ return this.breakForce;}
	get maxTorque(){ return this.breakTorque;}
	get maxSpin() { return this.breakSpin;}
	get pivot(){ return this.attachedObj; }

	get info(){
		let ev = (x) => { // I lOVE ES6 JS ON STERIODS
			switch(x){
				case Infinity:
					return "fixed";
				case 0:
					return "free";
				default:
					return "spring"
			}
		}
		return `${this.type} (dist:${ev(this.springConstant)}, rot:"${ev(this.rotationalSpringConstant)}, spin:${ev(this.spinSpringConstant)})`;
	}
	get type(){
		let response = undefined;
		switch(this.springConstant){ // I HOPE THAT THESE ARE ALL CORRECT
			case infinity: // fixed
				switch(this.rotationalSpringConstant){
					case infinity: // fixed
						switch(this.spinSpringConstant){
							case infinity: // fixed
								response = "fixedJoint";
								break;
							case 0: // free
								response = "fixedJointBearing";
								break;
							default: // spring
								response = "m-fixedJoint";
								break;
						}
						break;
					case 0: // free
						switch(this.spinSpringConstant){
							case infinity: // fixed
								response = "pivotJoint";
								break;
							case 0: // free
								response = "pivotJointBearing";
								break;
							default: // spring
								response = "m-pivotJoint";
								break;
						}
						break;
					default: // spring
						switch(this.spinSpringConstant){
							case infinity: // fixed
								response = "rotationalSpringyPivotJoint";
								break;
							case 0: // free
								response = "rotationalSpringyPivotJointBearing";
								break;
							default: // spring
								response = "m-pivotJoint";
								break;
						}
						break;
				}
				break;
			
			case 0: // free
				switch(this.rotationalSpringConstant){
					case infinity: // fixed
						switch(this.spinSpringConstant){
							case infinity: // fixed
								response = "slider";
								break;
							case 0: // free
								response = "fixedJointBearing";
								break;
							default: // spring
								response = "m-fixedJoint";
								break;
						}
						break;
					case 0: // free
						switch(this.spinSpringConstant){
							case infinity: // fixed
								response = "conatiner-oneSpin";
								break;
							case 0: // free
								response = "container";
								break;
							default: // spring
								response = "container-springSpin";
								break;
						}
						break;
					default: // spring
						switch(this.spinSpringConstant){
							case infinity: // fixed
								response = "technicSlider";
								break;
							case 0: // free
								response = "technicSliderBearing";
								break;
							default: // spring
								response = "m-technicSlider";
								break;
						}
						break;
				}
				break;

			default: // spring
				switch(this.rotationalSpringConstant){
					case infinity: // fixed
						switch(this.spinSpringConstant){
							case infinity: // fixed
								response = "springJoint";
								break;
							case 0: // free
								response = "springJointBearing";
								break;
							default: // spring
								response = "m-springJoint";
								break;
						}
						break;
					case 0: // free
						switch(this.spinSpringConstant){
							case infinity: // fixed
								response = "springedPendulum";
								break;
							case 0: // free
								response = "springedPendulumBearing";
								break;
							default: // spring
								response = "m-springedPendulum";
								break;
						}
						break;
					default: // spring
						switch(this.spinSpringConstant){
							case infinity: // fixed
								response = "doubleSpringedJoint";
								break;
							case 0: // free
								response = "doubleSpringedJointBearing";
								break;
							default: // spring
								response = "m-doubleSpringedJoint";
								break;
						}
						break;
				}
				break;
		}
		
		return response;
	}

	get connected(){
		if(this.attachedObj != null && this.attachedObj != undefined && this.rigidbody != null && null != this.transform){
			if(typeof(this.attachedObj) == GameObject && typeof(this.rigidbody) == RigidBody2D && typeof(this.transform) == Transform){
				return true;
			}
			else return 1; // (1 == true) is true   but   (1 === true) is false
		}
		else { return false;}
	}


	get pivotPos(){
		return f.v.add(this.transform.pos , f.v.rotate([this.thisOffX, this.thisOffY], this.transform.theta));
	}
	get hookPos(){
		return f.v.add(this.attachedObj.transform.pos, f.v.rotate([this.pivotXOffset, this.pivotXOffset], this.attachedObj.transform.theta));
	}
	get distanceVector(){
		return f.v.subtract(this.pivotPos - this.hookPos);
	}

	applyNormalForce(){ // CAUTION: Apply post or reg update
		// when the obj is outside of the border or this is a *fixed joint
		// calculate the normal force
		let avgForce = this.attachedObj.rigidbody.avgForce;
		let normalForce = f.v.multiply( f.v.project([-avgForce[0],-avgForce[1]], this.distanceVector), this.rigidbody.mass);

		// apply normal force on both objects according to Newton's 3rd Law
		this.rigidbody.applyForce(normalForce[0], normalForce[1]);
		this.attachedObj.rigidbody.applyForce(-normalForce[0], -normalForce[1]);

		// check break
		if(f.v.mag(normalForce) > this.maxForce){
			this.attachedObj = null;
			let strtemp = this.type;
			console.log("<<" + strtemp.substr(0,1).toLocaleUpperCase() + strtemp.substr(1) + ">> Connection Severed!");
			return -1||false;
		}
	}
	addNormalForce = this.applyNormalForce;

	applyMagneticField(obj){
		// to the rest of this's connections
		// to every other obj's connections
		// to all objs other than base & attachedobj
		if(typeof(obj) == Connection){
			// wire to wire
		} else if (typeof(obj) == GameObject){
			// wire to obj
		} else {
			console.error("Parameter obj in applyMagneticField(obj) should be of type Connection or GameObject. Instead it is registered as a(n) "+typeof(obj));
		}
	}

	// &below: what is distanceVector??? redo this with all variables
	preUpdate(ww = Infinity,wh = Infinity, wcenterx = 0, wcentery = 0){
		// no collider just rigidbody elastic physics
		
		let tempForceValues = this.forces;

		if(this.connected){
			if( ! f.exists(this.springConstant)){ 
				if(this.distanceToObj > this.distanceVector(this.attachedObj, this)){
					this.applyNormalForce();
				}
			} else {
				let springForce = - this.springConstant * this.distanceVector(a,b,ww,wh,wcenterx,wcentery);
				this.applyForce(f.v.multiply(f.v.normalize([this.x + this.thisXOffset - this.attachedObj.x - this.pivotXOffset,
											 this.y + this.thisYOffset - this.attachedObj.y - this.pivotYOffset]), springForce));
			}
		}
		if(this.connected){
			if(f.exists(this.rotationalSpringConstant) && f.exists(this.relativeAngle)){
				let torque = this.rotationalSpringConstant * (this.relativeAngle - this.angle);
				this.applyTorque(torque);
				if(this.breakTorque < this.forces[2] * this.inertia){
					this.attachedObj = null;
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
			this.attachedObj = null;
		}

		super.update();
	}
	postUpdate(ww = Infinity,wh = Infinity, wcenterx = 0, wcentery = 0){
		super.postUpdate(ww,wh,wcenterx,wcentery);
		if(this.connected){
			if(f.exists(this.rotationalSpringConstant) || f.exists(this.rotational_coefficient_of_friction)){
				// relative (aka: super fixed w. rotation)
				this.pos = f.v.add(f.v.add(f.v.rotate([this.thisOffX, this.thisOffY], this.transform.theta), f.v.rotate([this.pivotXOffset, this.pivotYOffset],this.attachedObj.theta)), this.attachedObj.pos);
			}
			else if(!f.exists(this.springConstant)){
				// fixed (distance)
				this.pos = f.v.project([this.x,this.y], this.distanceVector);
			}

		}
		super.postUpdate(ww,wh,wcenterx,wcentery);
	}
	draw(display){
		// draw a line with this.color if this.color != null
	}
};

// plus magnetic properties 
// make wire by free space plus magnetism plus color
