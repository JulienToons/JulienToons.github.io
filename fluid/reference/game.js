// NEED 2 CHANGE ALOT   //************************************************************************************!!!!!!!!!
const Game = function() {
  this.world    = new Game.World();
  this.update   = function(t) {
    this.world.update(t);
  };
};
Game.prototype = { constructor : Game };
/*  //collider
Game.Collider = function() {

  this.collide = function(value, object, tile_x, tile_y, tile_size) {

    switch(value) {

      case  1:     this.collidePlatformTop    (object, tile_y            ); break;
      case  2:     this.collidePlatformRight  (object, tile_x + tile_size); break;
      case  3: if (this.collidePlatformTop    (object, tile_y            )) return;
                   this.collidePlatformRight  (object, tile_x + tile_size); break;
      case  4:     this.collidePlatformBottom (object, tile_y + tile_size); break;
      case  5: if (this.collidePlatformTop    (object, tile_y            )) return;
                   this.collidePlatformBottom (object, tile_y + tile_size); break;
      case  6: if (this.collidePlatformRight  (object, tile_x + tile_size)) return;
                   this.collidePlatformBottom (object, tile_y + tile_size); break;
      case  7: if (this.collidePlatformTop    (object, tile_y            )) return;
               if (this.collidePlatformBottom (object, tile_y + tile_size)) return;
                   this.collidePlatformRight  (object, tile_x + tile_size); break;
      case  8:     this.collidePlatformLeft   (object, tile_x            ); break;
      case  9: if (this.collidePlatformTop    (object, tile_y            )) return;
                   this.collidePlatformLeft   (object, tile_x            ); break;
      case 10: if (this.collidePlatformLeft   (object, tile_x            )) return;
                   this.collidePlatformRight  (object, tile_x + tile_size); break;
      case 11: if (this.collidePlatformTop    (object, tile_y            )) return;
               if (this.collidePlatformLeft   (object, tile_x            )) return;
                   this.collidePlatformRight  (object, tile_x + tile_size); break;
      case 12: if (this.collidePlatformBottom (object, tile_y + tile_size)) return;
                   this.collidePlatformLeft   (object, tile_x            ); break;
      case 13: if (this.collidePlatformTop    (object, tile_y            )) return;
               if (this.collidePlatformBottom (object, tile_y + tile_size)) return;
                   this.collidePlatformLeft   (object, tile_x            ); break;
      case 14: if (this.collidePlatformBottom (object, tile_y + tile_size)) return;
               if (this.collidePlatformLeft   (object, tile_x            )) return;
                   this.collidePlatformRight  (object, tile_x + tile_size); break;
      case 15: if (this.collidePlatformTop    (object, tile_y            )) return;
               if (this.collidePlatformBottom (object, tile_y + tile_size)) return;
               if (this.collidePlatformLeft   (object, tile_x            )) return;
                   this.collidePlatformRight  (object, tile_x + tile_size); break;

    }

  }

};
Game.Collider.prototype = {

  constructor: Game.Collider,

  collidePlatformBottom:function(object, tile_bottom) {

    if (object.getTop() < tile_bottom && object.getOldTop() >= tile_bottom) {

      object.setTop(tile_bottom);
      object.velocity_y = 0;
      return true;

    } return false;

  },

  collidePlatformLeft:function(object, tile_left) {

    if (object.getRight() > tile_left && object.getOldRight() <= tile_left) {

      object.setRight(tile_left - 0.01);
      object.velocity_x = 0;
      return true;

    } return false;

  },

  collidePlatformRight:function(object, tile_right) {

    if (object.getLeft() < tile_right && object.getOldLeft() >= tile_right) {

      object.setLeft(tile_right);
      object.velocity_x = 0;
      return true;

    } return false;

  },

  collidePlatformTop:function(object, tile_top) {

    if (object.getBottom() > tile_top && object.getOldBottom() <= tile_top) {

      object.setBottom(tile_top - 0.01);
      object.velocity_y = 0;
      object.jumping    = false;
      return true;

    } return false;

  }

 };
*/

/*  //turn to object, liquid, and solid interfaces
Game.Object = function(x, y, width, height) {

 this.height = height;
 this.width  = width;
 this.x      = x;
 this.y      = y;

};
Game.Object.prototype = {
  
  constructor:Game.Object,
  
  collideObject:function(object) {

    if (this.getRight()  < object.getLeft()  ||
        this.getBottom() < object.getTop()   ||
        this.getLeft()   > object.getRight() ||
        this.getTop()    > object.getBottom()) return false;

    return true;

  },

  collideObjectCenter:function(object) {

    let center_x = object.getCenterX();
    let center_y = object.getCenterY();

    if (center_x < this.getLeft() || center_x > this.getRight() ||
        center_y < this.getTop()  || center_y > this.getBottom()) return false;

    return true;

  },

  getBottom : function()  { return this.y + this.height;       },
  getCenterX: function()  { return this.x + this.width  * 0.5; },
  getCenterY: function()  { return this.y + this.height * 0.5; },
  getLeft   : function()  { return this.x;                     },
  getRight  : function()  { return this.x + this.width;        },
  getTop    : function()  { return this.y;                     },
  setBottom : function(y) { this.y = y - this.height;          },
  setCenterX: function(x) { this.x = x - this.width  * 0.5;    },
  setCenterY: function(y) { this.y = y - this.height * 0.5;    },
  setLeft   : function(x) { this.x = x;                        },
  setRight  : function(x) { this.x = x - this.width;           },
  setTop    : function(y) { this.y = y;                        }

};

Game.MovingObject = function(x, y, width, height, velocity_max = 15) {

  Game.Object.call(this, x, y, width, height);

  this.jumping      = false;
  this.velocity_max = velocity_max;// added velocity_max so velocity can't go past 16
  this.velocity_x   = 0;
  this.velocity_y   = 0;
  this.x_old        = x;
  this.y_old        = y;

};
Game.MovingObject.prototype = {

  getOldBottom : function()  { return this.y_old + this.height;       },
  getOldCenterX: function()  { return this.x_old + this.width  * 0.5; },
  getOldCenterY: function()  { return this.y_old + this.height * 0.5; },
  getOldLeft   : function()  { return this.x_old;                     },
  getOldRight  : function()  { return this.x_old + this.width;        },
  getOldTop    : function()  { return this.y_old;                     },
  setOldBottom : function(y) { this.y_old = y    - this.height;       },
  setOldCenterX: function(x) { this.x_old = x    - this.width  * 0.5; },
  setOldCenterY: function(y) { this.y_old = y    - this.height * 0.5; },
  setOldLeft   : function(x) { this.x_old = x;                        },
  setOldRight  : function(x) { this.x_old = x    - this.width;        },
  setOldTop    : function(y) { this.y_old = y;                        }

};
Object.assign(Game.MovingObject.prototype, Game.Object.prototype);
Game.MovingObject.prototype.constructor = Game.MovingObject;

*/
	
	/*// obj examples
Game.Carrot = function(x, y) {

  Game.Object.call(this, x, y, 7, 14);
  Game.Animator.call(this, Game.Carrot.prototype.frame_sets["twirl"], 15);

  this.frame_index = Math.floor(Math.random() * 2);

  this.base_x     = x;
  this.base_y     = y;
  this.position_x = Math.random() * Math.PI * 2;
  this.position_y = this.position_x * 2;

};
Game.Carrot.prototype = {

  frame_sets: { "twirl":[12, 13] },

  updatePosition:function() {

    this.position_x += 0.1;
    this.position_y += 0.2;

    this.x = this.base_x + Math.cos(this.position_x) * 2;
    this.y = this.base_y + Math.sin(this.position_y);

  }

};
Object.assign(Game.Carrot.prototype, Game.Animator.prototype);
Object.assign(Game.Carrot.prototype, Game.Object.prototype);
Game.Carrot.prototype.constructor = Game.Carrot;

Game.Grass = function(x, y) {

  Game.Animator.call(this, Game.Grass.prototype.frame_sets["wave"], 25);

  this.x = x;
  this.y = y;

};
Game.Grass.prototype = {

  frame_sets: {

    "wave":[14, 15, 16, 15]

  }

};
Object.assign(Game.Grass.prototype, Game.Animator.prototype);

Game.Door = function(door) {

 Game.Object.call(this, door.x, door.y, door.width, door.height);

 this.destination_x    = door.destination_x;
 this.destination_y    = door.destination_y;
 this.destination_zone = door.destination_zone;

};
Game.Door.prototype = {};
Object.assign(Game.Door.prototype, Game.Object.prototype);
Game.Door.prototype.constructor = Game.Door;

Game.Player = function(x, y) {

  Game.MovingObject.call(this, x, y, 7, 12);

  Game.Animator.call(this, Game.Player.prototype.frame_sets["idle-left"], 10);

  this.jumping     = true;
  this.direction_x = -1;
  this.velocity_x  = 0;
  this.velocity_y  = 0;

};

Game.Player.prototype = {

  frame_sets: {

    "idle-left" : [0],
    "jump-left" : [1],
    "move-left" : [2, 3, 4, 5],
    "idle-right": [6],
    "jump-right": [7],
    "move-right": [8, 9, 10, 11]

  },

  jump: function() {

    if (!this.jumping && this.velocity_y < 10) {

      this.jumping     = true;
      this.velocity_y -= 13;

    }

  },

  moveLeft: function() {

    this.direction_x = -1;
    this.velocity_x -= 0.55;

  },

  moveRight:function(frame_set) {

    this.direction_x = 1;
    this.velocity_x += 0.55;

  },

  updateAnimation:function() {

    if (this.velocity_y < 0) {

      if (this.direction_x < 0) this.changeFrameSet(this.frame_sets["jump-left"], "pause");
      else this.changeFrameSet(this.frame_sets["jump-right"], "pause");

    } else if (this.direction_x < 0) {

      if (this.velocity_x < -0.1) this.changeFrameSet(this.frame_sets["move-left"], "loop", 5);
      else this.changeFrameSet(this.frame_sets["idle-left"], "pause");

    } else if (this.direction_x > 0) {

      if (this.velocity_x > 0.1) this.changeFrameSet(this.frame_sets["move-right"], "loop", 5);
      else this.changeFrameSet(this.frame_sets["idle-right"], "pause");

    }

    this.animate();

  },

  updatePosition:function(gravity, friction) {

    this.x_old = this.x;
    this.y_old = this.y;

    this.velocity_y += gravity;
    this.velocity_x *= friction;

    if (Math.abs(this.velocity_x) > this.velocity_max)
    this.velocity_x = this.velocity_max * Math.sign(this.velocity_x);

    if (Math.abs(this.velocity_y) > this.velocity_max)
    this.velocity_y = this.velocity_max * Math.sign(this.velocity_y);

    this.x    += this.velocity_x;
    this.y    += this.velocity_y;

  }

};
Object.assign(Game.Player.prototype, Game.MovingObject.prototype);
Object.assign(Game.Player.prototype, Game.Animator.prototype);
Game.Player.prototype.constructor = Game.Player;
*/
/* // tileset
Game.TileSet = function(columns, tile_size) {

  this.columns    = columns;
  this.tile_size  = tile_size;

  let f = Game.Frame;

  this.frames = [new f(115,  96, 13, 16, 0, -4), // idle-left
                 new f( 50,  96, 13, 16, 0, -4), // jump-left
                 new f(102,  96, 13, 16, 0, -4), new f(89, 96, 13, 16, 0, -4), new f(76, 96, 13, 16, 0, -4), new f(63, 96, 13, 16, 0, -4), // walk-left
                 new f(  0, 112, 13, 16, 0, -4), // idle-right
                 new f( 65, 112, 13, 16, 0, -4), // jump-right
                 new f( 13, 112, 13, 16, 0, -4), new f(26, 112, 13, 16, 0, -4), new f(39, 112, 13, 16, 0, -4), new f(52, 112, 13, 16, 0, -4), // walk-right
                 new f( 81, 112, 14, 16), new f(96, 112, 16, 16), // carrot
                 new f(112, 115, 16,  4), new f(112, 124, 16, 4), new f(112, 119, 16, 4) // grass
                ];

};
Game.TileSet.prototype = { constructor: Game.TileSet };
*/
Game.World = function(w=16000/3,h=9000/3,gravity = 2) {  //friction = 0.85
  this.gravity      = gravity;
  this.height = h;
  this.width = w;
  this.points = [];
  //this.point = [];
/* // example vars
  this.collider     = new Game.Collider();

  this.friction     = friction;
  this.gravity      = gravity;

  this.columns      = 12;
  this.rows         = 9;

  this.tile_set     = new Game.TileSet(8, 16);
  this.player       = new Game.Player(32, 76);

  this.zone_id      = "00";

  this.carrots      = [];// the array of carrots in this zone;
  this.carrot_count = 0;// the number of carrots you have.
  
  this.eatenCarrots = []; //*************************************** CARROT EATEN UPDATE ***************************************

  this.doors        = [];
  this.door         = undefined;

  this.height       = this.tile_set.tile_size * this.rows;
  this.width        = this.tile_set.tile_size * this.columns;

  //this.win          = false;
  */
};
Game.World.prototype = {

  constructor: Game.World,
/* collide obj function
  collideObject:function(object) {

    var bottom, left, right, top, value;

    top    = Math.floor(object.getTop()    / this.tile_set.tile_size);
    left   = Math.floor(object.getLeft()   / this.tile_set.tile_size);
    value  = this.collision_map[top * this.columns + left];
    this.collider.collide(value, object, left * this.tile_set.tile_size, top * this.tile_set.tile_size, this.tile_set.tile_size);

    top    = Math.floor(object.getTop()    / this.tile_set.tile_size);
    right  = Math.floor(object.getRight()  / this.tile_set.tile_size);
    value  = this.collision_map[top * this.columns + right];
    this.collider.collide(value, object, right * this.tile_set.tile_size, top * this.tile_set.tile_size, this.tile_set.tile_size);

    bottom = Math.floor(object.getBottom() / this.tile_set.tile_size);
    left   = Math.floor(object.getLeft()   / this.tile_set.tile_size);
    value  = this.collision_map[bottom * this.columns + left];
    this.collider.collide(value, object, left * this.tile_set.tile_size, bottom * this.tile_set.tile_size, this.tile_set.tile_size);

    bottom = Math.floor(object.getBottom() / this.tile_set.tile_size);
    right  = Math.floor(object.getRight()  / this.tile_set.tile_size);
    value  = this.collision_map[bottom * this.columns + right];
    this.collider.collide(value, object, right * this.tile_set.tile_size, bottom * this.tile_set.tile_size, this.tile_set.tile_size);

  },
*/
  setup:function() {
	console.log("Version Alpha 1.1a");
    this.points = new Array();
	
	for(let i = 0; i< 30;i++){
		this.points[i] =new Game.Point(50+ (i*180),400);
	}
	
  },

  update:function(t) {
	let tempFunction = function(t,i) {
		let refinedTime = (t/200) + (i/3);
		let a = Math.sin(refinedTime);
		let d = Math.sin(i/4);

		let b = 3* Math.sin(3*refinedTime+ .7);
		let c = 2 * Math.sin((4*refinedTime) + 1.2);
		return 50*(a+b+c+d)/3;
	};
	for(let i = 0; i< this.points.length;i++){
	  let pt=this.points[i];
	  
	  pt.pos=[pt.baseX,pt.baseY + Math.floor(tempFunction(t,i))];
	}
  }
};
Game.Point = function(sx,sy){
	this.baseX=sx;
	this.baseY=sy;
	this.pos= [sx,sy];
};

