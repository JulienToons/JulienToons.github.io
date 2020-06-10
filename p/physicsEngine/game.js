const Game = function (w, h, DEBUG=false) {
  this.world = new Game.World(w, h, .2, DEBUG);
  this.update = function (t = 0) {
    this.world.update();
  };
};
Game.prototype = { constructor: Game };


Game.World = function (w = 1000, h = 1000, cs=.2,debug) {
	const DEBUG = (f.exists(debug.on))? debug: {on:debug,mode:" vector-visualization !mouse-world mouse-field !mouse-stats "}; 

  this.height = h;
  this.width = w;
  this.camera = cs; // temp store size then set to camera class instance
  this.gravity = g;

	this.objects = (function(nm, cryptKey=0){
		let gameobjects = {};
		let failedAttempts = 0;
		let succesfulAttempts = 0;
		let lock = false;
		let crypt = cryptKey;
		let decrypt = function(key){
			return key - crypt;
		}
		let encrypt = function(key){
			return key + crypt;
		}
		return {
			add(object, key = Math.round(Math.random,10000000)){
				gameobjects[key]=object;
				return key;
			},
			addUncrypted(obj,key){
				this.add(obj,encrypt(key));
			},
			GET(key){
				if(!lock){
					try {
						succesfulAttempts++;
						return gameobjects[key];
					}
					catch (e) {
						failedAttempts++;
						if(failedAttempts/succesfulAttempts > 1.45 && failedAttempts > 1000){
							lock = true;
							console.error("LIST IS NOW <<<LOCKED>>>");
						}
						console.error(e);
						return -1;
					}
				}
				else {
					console.error("Hidden List is LOCKED\nToo many attempts to access (a) variable(s) that do(es) not exist");
				}
			}
		}
	})(); // secure list
	this.gameObjects = {}; // public dictionary then list
  this.user = null; // player contains string and hammer
};
Game.World.prototype = {

	constructor: Game.World,

	setup:function() {
		console.log("Julien Owhadi's Physics Engine vPREALPHA 1.00001");
		this.camera = new Game.Camera(0,0,this.camera);

		// use dictionary of gameobjects:   ids and objs
		// https://pietschsoft.com/post/2015/09/05/javascript-basics-how-to-create-a-dictionary-with-keyvalue-pairs

		// let boundingSafetyVar = 40;
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