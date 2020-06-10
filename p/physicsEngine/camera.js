/*
EXTRACT THE PIXELS FROM THE CANVAS & EDIT THAT <=> render

Class Tree: Camera
COMPLETE: yes
TODO: none
EXTRA: renderers
*/

Camera = function(xx,yy,cs = .3, renderer = null){
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
	this.freezeLerp = false;
	this.posTimeline=[];
	this.rotTimeline=[];
	this.renderer = renderer; // render every gameobject in camera with their own render plus the camera's renderer
};
Camera.prototype = {
	constructor: Game.Camera,
	shake:function(...args){
		if(!this.shaking(2)){
			this.posTimeline = [[this.x,this.y,-0.000001]];
			this.rotTimeline = [[this.theta,-0.000001]];
		}
		if(!f.exists(args) || args[0] == "b"){
				this.addRandomShakeFrames("both", f.rand(3,12));
		} else if(args[0] == "r"){
				this.addRandomShakeFrames("rot", f.rand(3,12));
		} else if(args[0] == "p"){
				this.addRandomShakeFrames("pos", f.rand(3,12));	
		} else if(args.length ==2 ){
			this.posTimeline.push(...args[0]);
			this.rotTimeline.push(...args[1]);
		} else{
			if(args.length ==1 ){
				args = args[0];
			}
			switch(args[0].length){
				case 2:
					this.rotTimeline.push(...args);
					break;
				case 3:
					this.posTimeline.push(...args);
					break;
				case 4: //[x,y,r,t]
					for(fr in args){
						this.rotTimeline.push([args[2],args[3]]);
						this.rotTimeline.push([args[0],args[1],args[3]]);
					}
					break;
				default:
					console.log("error camera shake function")
			}
		}
		this.freezeLerp = true;
	},
	shaking:function(a=2){
		return (this.posTimeline.length>=a || this.rotTimeline>=a);
	},
	normalizeTimeLine:function(timeline, duration){
		let le = timeline[timeline.length-1].length-1;
		let mag = duration / timeline[timeline.length-1][le];
		for(t in timeline){
			t[le] = t[le] * mag;
		}
		return timeline;
	},
	addRandomShakeFrames:function(type="both", num=1, timeMin = 3, timeMax = 100 /*frames*/, spreadMax = 5, spreadMin = 1, duration = null){
		let art1, art2, art3, art4;
		switch (type){
			case "both":
				if(duration == null) {
					for(let i=0;i<num;i++){
							art1 = f.random(spreadMin, spreadMax);
							art2 = f.random(spreadMin, spreadMax);
							art3 = f.random(spreadMin, spreadMax);
							art4 = f.random(timeMin, timeMax);
							this.shake([ art1,art2 ,art4],[art3,art4]);
					}
				} else {
					for(let i=0;i<num;i++){
						art1 = f.random(spreadMin, spreadMax);
						art2 = f.random(spreadMin, spreadMax);
						art3 = f.random(spreadMin, spreadMax);
						art4 = f.random(timeMin, timeMax);
						this.shake(this.normalizeTimeLine([ art1,art2 ,art4],duration),this.normalizeTimeLine([art3,art4],duration));
					}
				}
				break;
			case "pos":
				if(duration == null) {
					for(let i=0;i<num;i++){
							art1 = f.random(spreadMin, spreadMax);
							art2 = f.random(spreadMin, spreadMax);
							art4 = f.random(timeMin, timeMax);
							this.shake([ art1,art2 ,art4]);
					}
				} else {
					for(let i=0;i<num;i++){
						art1 = f.random(spreadMin, spreadMax);
						art2 = f.random(spreadMin, spreadMax);
						art4 = f.random(timeMin, timeMax);
						this.shake(this.normalizeTimeLine([ art1,art2 ,art4],duration));
					}
				}
				break;
			case "rot":
				if(duration == null) {
					for(let i=0;i<num;i++){
							art3 = f.random(spreadMin, spreadMax);
							art4 = f.random(timeMin, timeMax);
							this.shake([art3,art4]);
					}
				} else {
					for(let i=0;i<num;i++){
						art3 = f.random(spreadMin, spreadMax);
						art4 = f.random(timeMin, timeMax);
						this.shake(this.normalizeTimeLine([art3,art4],duration));
					}
				}
				break;
			default:
				console.log("error addrandomshakeframe "+type+" is not a valid type");
    }
	},
	update:function(player){ // stationary shake or shake on followed transform?
		if(this.shaking(2)){
      
      this.shakeFrames++;
      
      if(this.posTimeline[1] <= this.shakeFrames){ this.posTimeline.splice(0,1); }
      if(this.rotTimeline[1] <= this.shakeFrames){ this.rotTimeline.splice(0,1); }
      this.x = posTimeline[0][0] + ( (this.posTimeline[1][0] - this.posTimeline[0][0])*(this.shakeFrames - this.posTimeline[0][2])/(this.posTimeline[0][2] + this.posTimeline[1][2]) );
      this.y = posTimeline[0][1] + ( (this.posTimeline[1][1] - this.posTimeline[0][1])*(this.shakeFrames - this.posTimeline[0][2])/(this.posTimeline[0][2] + this.posTimeline[1][2]) );
      this.theta = rotTimeline[0][0] + ( (this.rotTimeline[1][0] - this.rotTimeline[0][0])*(this.shakeFrames - this.rotTimeline[0][2])/(this.rotTimeline[0][1] + this.rotTimeline[1][1]) );


			if(!this.shaking(2)){
        this.rotTimeline = [];
        this.posTimeline = [];
				this.freezeLerp = false;
				this.shakeFrames=0;
			}
		}
		if(!freezeLerp){
			// lerp: follow player smoothly
			this.x = (Math.abs(this.x - player.x) <= this.snapDistance)?   (player.x) + (this.lerpFactor * (this.x - player.x))  :  player.x;
			this.y = (Math.abs(this.x - player.x) <= this.snapDistance)?  (player.y) + (this.lerpFactor * (this.y - player.y))  :  player.y;
		}
	}
};