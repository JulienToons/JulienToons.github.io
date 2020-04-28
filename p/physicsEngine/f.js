
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
		static centerOfTriangle(){

		}
		static center(points, mode = false){ // true = "3d" = 3 // false = "2d" = 2
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