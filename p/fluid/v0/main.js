
window.addEventListener("load", function(event) {

  "use strict";

  const AssetsManager = function() {

    this.img = undefined;

  };

  AssetsManager.prototype = {
    constructor: Game.AssetsManager,
    requestImage:function(url, callback) {
      let image = new Image();
      image.addEventListener("load", function(event) {
        callback(image);
      }, { once:true });
      image.src = url;
    },
  };


  var keyDownUp = function(event) {
    controller.keyDownUp(event.type, event.keyCode);
  };

  var resize = function(event) {

    display.resize(document.documentElement.clientWidth, document.documentElement.clientHeight, game.world.height / game.world.width);
    display.render();

  };

  var render = function() {
	 display.fill("rgba(180,196,211,0.25)");
	 display.drawLine(game.world.points);

/*   NEED 2 ADD RENDERING //************************************************************************************!!!!!!!!!
    var frame = undefined;

    display.drawMap   (assets_manager.tile_set_image,
    game.world.tile_set.columns, game.world.graphical_map, game.world.columns,  game.world.tile_set.tile_size);

    for (let index = game.world.carrots.length - 1; index > -1; -- index) {

      let carrot = game.world.carrots[index];

      frame = game.world.tile_set.frames[carrot.frame_value];

      display.drawObject(assets_manager.tile_set_image,
      frame.x, frame.y,
      carrot.x + Math.floor(carrot.width * 0.5 - frame.width * 0.5) + frame.offset_x,
      carrot.y + frame.offset_y, frame.width, frame.height);

    }

    frame = game.world.tile_set.frames[game.world.player.frame_value];

    display.drawObject(assets_manager.tile_set_image,
    frame.x, frame.y,
    game.world.player.x + Math.floor(game.world.player.width * 0.5 - frame.width * 0.5) + frame.offset_x,
    game.world.player.y + frame.offset_y, frame.width, frame.height);

    for (let index = game.world.grass.length - 1; index > -1; -- index) {

      let grass = game.world.grass[index];

      frame = game.world.tile_set.frames[grass.frame_value];

      display.drawObject(assets_manager.tile_set_image,
      frame.x, frame.y,
      grass.x + frame.offset_x,
      grass.y + frame.offset_y, frame.width, frame.height);

    }
	
    p.innerHTML = "Carrots: " + game.world.carrot_count;
*/
    display.render();

  };

  var update = function(t) {
/*  //  Temorary Debug Controls 
    if (controller.left.active ) { game.world.player.moveLeft ();                               }
    if (controller.right.active) { game.world.player.moveRight();                               }
    if (controller.up.active   ) { game.world.player.jump();      controller.up.active = false; }
	*/
	
    game.update(t);
    return;
    
  };

  var assets_manager = new AssetsManager();
  var controller     = new Controller();
  var display        = new Display(document.querySelector("canvas"));
  var game           = new Game();
  var engine         = new Engine(1000/30, render, update);

/*  Text
  var p              = document.createElement("p");
  p.setAttribute("style", "color:#c07000; font-size:2.0em; position:fixed;");
  p.innerHTML = "Carrots: 0";
  document.body.appendChild(p);
*/

  display.buffer.canvas.height = game.world.height;
  display.buffer.canvas.width  = game.world.width;
  display.buffer.imageSmoothingEnabled = false; //  sure??  ************************************************************************************!!!!!!!!!

  // assets_manager.requestJSON(ZONE_PREFIX + game.world.zone_id + ZONE_SUFFIX, (zone) => { stuff});

    game.world.setup();

//  CHANGE IMG and textures   and create geometric imgs like spheres, etc.  //************************************************************************************!!!!!!!!!
    /*assets_manager.img("rabbit-trap.png", (image) => {

      assets_manager.img = image;
*/
      resize();
      engine.start();
 // });

  
  window.addEventListener("keydown", keyDownUp);
  window.addEventListener("keyup"  , keyDownUp);
  window.addEventListener("resize" , resize);

});