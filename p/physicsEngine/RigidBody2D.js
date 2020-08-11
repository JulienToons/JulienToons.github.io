class RigidBody2D{
	constructor( transform=new Transform(),density = 1, charge = 0, collider=undefined) {
// I will use default values aka var b = undefined ?? 12; instead of collider = {area:1,volume:1,vol:1,integralDistanceSquared:0.66, relativeCenterOfMass:[0,0]}

		// Initialize Variables
		this.density = density;
		this.transform = transform;
		this.collider = collider;
		this.forces = [];
		this.charge = charge;

		// REQUIREMENTS
		if(typeof(transform) != SuperTransform){
			console.error("Rigidbody2D components REQUIRE 'Transform's of type 'SuperTransform'");
		}
	}
	get col(){return this.collider;}
	get rcom(){ return this.collider.relativeCenterOfMass ?? [0,0];}
	get d(){
		return this.density;
	}
	get m(){
		return this.density * (this.collider.volume ?? 1);
	}
	get mass(){ return m;}
	get inertia (){ return this.m * (this.collider.integralDistanceSquared ?? 0.66);}

	worldPoint(pt){ // convert geometry point into world coordinates
		if(typeof pt == Number){
			pt = this.points[pt];
		}
		return f.v.add(this.pos, f.v.rotate(pt, this.theta));
	}
	toWorldPoint(pt){ return this.worldPoint(pt);}

	applyAcceleration(ax,ay){
		this.applyForce(ax * this.mass, ay * this.mass);
	}
	applyForce(fx = 0,fy = 0,ox = 0,oy = 0){ // in coordinates relative to com
		this.forces.push({
			ox:ox,oy:oy,fx:fx,fy:fy
		});
	}
	addForce(fx = 0,fy = 0,ox = 0,oy = 0){
		this.applyForce(fx,fy,ox,oy);
	}

	addRelativeForce(fx = 0,fy = 0,ox = 0,oy = 0){ // in coordinates relative to this.pos
		let rop = f.v.sub([ox,oy], this.rcom);
		this.addForce(fx,fy,rop[0],rop[1]);
	}
	applyRelativeForce(...args){
		return this.addRelativeForce(args);
	}

	addWorldForce(fx = 0,fy = 0,ox = 0,oy = 0){ // in world coordinates
		let rop = f.v.sub([ox,oy], this.pos);
		this.addRelativeForce(fx,fy,rop[0],rop[1]);
	}
	applyWorldForce(...args){
		return this.addWorldForce(args);
	}

	addTorque(tor){
		f.add(0,tor,0.5,0);
		f.add(0,-tor,-0.5,0);
	}
	applyTorque(tor){
		this.addTorque(tor);
	}

	addRotationalAcceleration(alpha){
		this.addTorque(alpha * this.inertia);
	}
	applyRotationalAceeleration(alpha){
		addRotationalAcceleration(alpha);
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
	get prediction(time = 1){ // uses next values
		let forceValuesTemp = this.avgForce;
		let vx = this.transform.nvx + (forceValuesTemp[0] * time),
		    vy = this.transform.nvy + (forceValuesTemp[1] * time),
		    nomega = this.transform.nomega + (forceValuesTemp[2] * time);
		return {
			x: this.transform.nx,
			y: this.transform.nx,
			theta: this.transform.nangle,
			vx: vx,
			vy: vy,
			omega: nomega
		}
	}
	get updateChain(){
		return [
			[-1, this.preUpdate],
			[0, this.update],
			[1, this.postUpdate]
		];
	}
	fullUpdate(){
		preUpdate();
		update();
		postUpdate();
	}
	preUpdate(){
		// none
	}
	update(time /*in frames*/ = 1){
		let forceValuesTemp = this.avgForce;
		this.transform.nvx += forceValuesTemp[0] * time;
		this.transform.nvy += forceValuesTemp[1] * time;
		this.transform.nomega += forceValuesTemp[2] * time;
	}
	postUpdate(){
		this.forces.clear();
	}

};