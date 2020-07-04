/* BY... 
\\\ \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ \\\
\\\ \\                 \\\             \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ \\\
\\\ \\\\\\\\\    \\\\\\\\\\\\\\   \\\\\\\      \\\\\\\\      \\\\\     \\\\\\\\\\\\\\         \\\\\\\\ \\\
\\\ \\\\\\\\\\    \\\\\\\\\\\\\\   \\\\\   \\\   \\\\\   \\\   \\\\            \\\\\    \\\\\   \\\\\\ \\\
\\\ \\\\\\\\\\\    \\\\\\\\\\\\\\   \\\\   \\\\\   \\\   \\\\\   \\\     \\\\\   \\\    \\\\\\\\\\\\\\ \\\
\\\ \\\\\   \\\\    \\\\\\\\\\\\\\   \\\\   \\\\\   \\\   \\\\\   \\\   \\\\\\\   \\\\          \\\\\\ \\\
\\\ \\\\\   \\\\    \\\\\\\\\\\\\\\   \\\\   \\\\\   \\\   \\\\\   \\\   \\\\\\\   \\\\\\\\\\\   \\\\\ \\\
\\\ \\\\\\   \\    \\\\\\\\\\\\\\\\\   \\\\\   \\\   \\\\\   \\\   \\\\   \\\\\\\   \\\   \\\\\   \\\\ \\\
\\\ \\\\\\\\     \\\\\\\\\\\\\\\\\\\\   \\\\\\       \\\\\\\       \\\\\   \\\\\\\   \\\\         \\\\ \\\
\\\ \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ \\\
...or know how to create simple extendable prototypes with private variables with inheritance/abstract capabilities?
Hey is anyone familiar with how to create private &/or  privileged variables in ES6 JavaScript extendable classes (with `constructors `, the `class `keyword, as well as getters & setters) without using Immediately Invoked Function Expressions (IIFEs), old function-based classes as in `var x = function(){var privateVariableName = "xyz"; return{publicvar1=5;publicvar2=1}}`, or fake private variable prefixes that do nothing like _notprivatevar or #notprivatevar?
*/

class f{ // static helper functions
	static c = class c{
		static get epsilon(){ return .001; }
		static get pixelsToMeters(){ return 3; } // more like units to meters because canvas' 'pixels' are scalable to real viewport atomic pixels
		static get metersToPixels(){ return 1/f.c.pixelsToMeters; }
		static get metersToUnits(){ return 1/f.c.pixelsToMeters; }
		static get unitsToPixels(){ return f.c.pixelsToMeters; }
		static get coulombsToCharge(){ return 1;} // 1 e = 1.60 * 10^-19 C
		static get chargeToCoulombs(){ return 1/f.c.coulombsToCharge;}

		// _ in metric units
		static get _g(){ return 9.8; } // acceleration due to gravity
		static get _G(){ return 6.67* Math.pow(0.1,11);	} // Gravitational Constant
		static get _K(){ return 9 * Math.pow(10,9);	} // coulomb's constant
		static get _Mc(){ return Math.pow(0.1 , 7);	} // magnetic constant
		static get _x(){ return 1;	}
		static get _y(){ return 1;	}
		static get _z(){ return 1;	}

		// in game units
		static get g(){ return f.c._g * f.c.metersToPixels; } // acceleration due to gravity
		static get G(){ return f.c._G * Math.pow(f.c.metersToPixels,3);	} // Gravitational Constant
		static get K(){ return f.c._K * Math.pow(f.c.metersToPixels,2) * f.c.chargeToCoulombs;	} // coulomb's constant
		static get Mc(){ return f.c._Mc  * f.c.chargeToCoulombs;	} // magnetic constant
		
		
		

		static toDeg(a){ return a * 180 /Math.PI;	}
		static toRad(a){ return a * Math.PI / 180; }
	}
	static exists(a){ return a != null && a != undefined && isFinite(a);} /*foolproof*/

	static random(a,b = null){
		if(f.exists(b)){
			return Math.min(a,b) + Math.random() * (Math.max(b,a) - Math.min(b,a));
		}
		else {
			return a*Math.random();
		}
	}
	static rand(a,b=null){return this.random(a,b);}
	static strToArr(str, key = (str.includes(" "))? " ":","){
		let i = 0;
		let arr = [];
		for(i=0;str.substr(i).includes(key) && (i=str.substr(i).indexOf(key))>=0;i=str.substr(i+1).indexOf(key)){
			let temp = str.substr(i,str.indexOf(key));
			if(temp == " ") { continue; }
			arr.push(temp);
		}
	}
	// useful? idk
	static pointer(...args){
		let temp = 	{ // my makeshift flipping pointing scapegoat which is actudally just a storage handler & an accessor for pointers
			// maybe add security & private/protected variables later on
			get out(key){

			},
			set inout(key,val){

			},
			get all(){

			}n 
			add:function(...args){
				create dic with rand keys for each
				return keys
			}
			keyasinbelow:val,
			Math.round(Math.random,12)+n:variablevalue,
			pointers: []
		}
		temp.add(...args);
		return temp;
	}
	/*
	static insanePointer = { // dumb idea... might continue later on
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
		static diff(a,b){
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
  static generator = class generator{
		// perlin noise 2d top-down proceduaral terrain generation
		/* always default, maybe add ingame veritility later
		constructor(...args){
			let L = args.length;
			let n = 1;
			this.layers = (L>=n)? args.splice(n,L-n): [{
				// layer content default example
				frequency:.5;
	
			}];
		}*/
		static randomSeed(seed,...parameters){
			return []; // mesh with cavities as well
		}

		// mode for bouncy sides
	};
	static geometry = class geometry{
		static lineContainsPoint(pt1,pt2,pt3, mode = true){
			// extend vert/hor ray through pt3 and check if it passes through the line (pt1,pt2)
			if (mode = true || mode == "vert" || mode == "vertical"){ // vertical ray
				return (pt1[0] < pt3[0] && pt2[0] > pt3[0]) || (pt1[0] > pt3[0] && pt2[0] < pt3[0]);
			} else { // horizontal ray
				return (pt1[1] < pt3[1] && pt2[1] > pt3[1]) || (pt1[1] > pt3[1] && pt2[1] < pt3[1]);
			}
		}
    static triangulate(points, ...args){ // for soft bodies too // not sure if neccesary
      let triangles = [];
      let i = 0;
      let next = function(n=1){ return (i + n%points.length >= points.length)? points[n%points.length-1]:points[i+n%points.length] };
      let prev = function(n=1){ return (i - n%points.length< 0)? points[points.length-n%points.length]:points[i-n%points.length] };
     
      let recursiveConnector = function(index){ // several connections to one point
        // points[], i, triangles

        // base case

        // concave point

        // convex point
        // concave-convex-concave
        // convex-concave-convex
        // convex-convex-convex
        // concave-concave-concave
      }

      // make connections and add triangles
      while(i<points.length){
        i += recursiveConnector(i+1);
      }

      return triangles; // should store in var unless collider is a soft body
		}
		static area(points){
			if(points.length< 3){
				console.error("f.geometry.area function: input parameter length is "+points.length+". It should be an array with l>=3");
				return -1;
			}
			else if(points.length == 3){ // quick calculate for triangles
				let temp = points[0][0] * (points[1][1] - points[2][1]);
				temp += points[1][0] * (points[2][1] - points[0][1]);
				temp += points[2][0] * (points[0][1] - points[1][1]);
				return Math.abs(  temp/2  );
			}
			else{ // for any polygon concave or not
				let triangles = this.triangulate(points);
				let tempA = 0;
				for (t in triangles){
					tempA+=f.geometry.area(t);
				}
				return tempA;
			}
		}
		static centerOfMass(points){return f.geometry.COM(points);}
		static COM(points){ // maybe artificial weights???:::     point[x,y,weight]
			let pts,cavities;
			if(Array.isArray( points[0][0]) && points.length == 2){ // with cavities
				pts = points[0];
				cavities = points[1];
			}
			else{
				pts = points;
			}
			let triangles = this.triangulate(pts);
			let com = [0,0];
			let totalArea = 0;

			// average pos of centeroftriangles of each triangle
			for (t in triangles){
				// center of triangle with respect to area
				let tempA = f.geometry.area(t);
				com = f.v.add(   f.v.add(f.v.mult(f.geometry.centerOfTriangle(t),tempA))   );
				totalArea += tempA;
			}
			//cavities
			if(cavities.length >= 3){
				triangles = f.geometry.triangulate(cavities);
				for (t in triangles){
					// center of triangle with respect to area
					let tempA = -1 * f.geometry.area(t); // negative area
					com = f.v.add(   f.v.add(f.v.mult(f.geometry.centerOfTriangle(t),tempA))   );
					totalArea += tempA;
				}
			}

			return f.v.mult(com, 1/totalArea);

		}
		static centerOfTriangle(points){return [(points[0][0] + points[1][0] + points[2][0])/3, (points[0][1] + points[1][1] + points[2][1])/3];}
		static center(points){ // for auto centerofmass = COM of mesh - COM of cavities
// MAYBE COM IS BETTER THAN CENTER!!!!!
			// not for weights just for standard polygons
			let com = [0,0],pts,cavities =[];
			if(Array.isArray( points[0][0]) && points.length == 2){ // with cavities
				pts = points[0];
				cavities = points[1];
			}
			else{
				pts = points;
			}
			for (p in pts){
				com = f.add(f.v.mult( p, 1/pts.length), com);
			}
			for (p in cavities){
				com = f.add(f.v.mult( p, -1/cavities), com);
			}



			return com/totalArea;

		}
		static isPointOnLine(a1,a2, b) {
			let aTmp = [a2[0] - a1[0], a2[1] - a1[0]];
			let bTmp = [b[0] - a1[0], b[1] - a1[1]];
			let r = Math.cross(aTmp, bTmp);
			return Math.abs(r) < f.c.epsilon;
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

	// special forces
	static sf = class sf{
		static resistance(obj, constant = 1){ // i forgot what this does:  normal force?
			let m = -.5 * obj.density * this.v.mag(obj.v) * this.v.mag(obj.v) * obj.frontSurfaceArea;
			obj.applyForce(this.v.multiply(this.v.normalize(obj.v), m));
		}

		static gravitational(a,b,g = 1,ww = Infinity, wh = Infinity, wx = 0, wy = 0){ // g = gravitational constant
			let d = dis(a,b, ww,wh,wx,wy);
			let f =  g * a.m * b.m / (d * d);

			b.applyForce((a.x - b.x) * f/ d, (a.y - b.y) * f/d);
			a.applyForce((b.x - a.x) * f/ d, (b.y - a.y) * f/d);
		}
		static buoyant(a, density = 1, gravity = 1){
			a.applyForce(0, - a.voulume * density * gravity);
		}
		static friction(){

		}
		static normal(){

		}
		static airResistance(){
			// drag force   =  constant * .5  * airDensity * surface area * velocity^squared
			
		}
		static applyFields(one, object, G = 1, E=1){ // one way (changes this obj vars) (need to replicate twice due to Newton's 3rd law)
			// global constants?
			// object is type RigidBody2D

			let qualifier = 0.1, f;
			if(!(object.m == 0 || one.m == 0 || G * object.m * one.m < qualifier)){ // gravitational
				let tdiff = f.v.subtract(one.object.collider.com,one.collider.com);
				f = - G *  object.m * one.m/ (Math.pow(f.v.mag(tdiff)),2); // use rigidbody.collider or collider????? via gameobject===typeof(object)???
				one.applyForce(f.v.multiply(f.v.normalize(tdiff),f));
				// apply force to this
			}
			qualifier = 0.2;
			if(!( object.charge==0||one.charge==0|| E * object.charge * one.charge < qualifier)){ // electric
				let tdiff = f.v.subtract(one.object.collider.electricCenterOfMass,one.collider.electricCenterOfMass);
				f = E * object.charge * one.charge/(Math.pow(f.v.mag(tdiff)),2);
				one.applyForce(f.v.multiply(f.v.normalize(tdiff),f));
			}
			qualifier = 0.2;
			if(false){ // magnetic
				// only with collider/connection physical properties
			}
		}
	}

	static KE(mass, velocity){ // kinetic energy
		return .5 * mass * velocity * velocity;
	}
	/* unnecessary: inertia
	static simpInertia(mass,area){
		return .4 * mass * area / Math.PI;
	}
	*/
	/* unnecessary dist. unless looped world: also does not work
	static dis(a,b, ww = Infinity, wh = Infinity, wx = 0, wy = 0){ // no looped world
		let dx = Math.min(a.x - b.x, a.x -  (b.x + (ww/2) - wx));
        let dy = Math.min(a.y - b.y, a.y - b.y);
        return Math.sqrt(dx * dx + dy * dy);
	}
	static distance(a,b,ww = Infinity, wh = Infinity, wx = 0, wy = 0){return dis(a,b,ww,wh,wx,wy);}
	static dist(a,b,ww = Infinity, wh = Infinity, wx = 0, wy = 0){return dis(a,b,ww,wh,wx,wy);}
	*/
	
	// needs work
	static col(a,b){f.elasticCollision(a,b);} // need collison with forces
	// major problem use Impulse = m*v= Momentum = F*t
	// impulse sticky:stop 2 move in same direction; slow down; split diff directions       & ke conserve?
	// stick & use aprings if net move together
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