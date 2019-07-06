
window.addEventListener("load", function(event) {
  var resize = function(event) {

    display.resize(document.documentElement.clientWidth, document.documentElement.clientHeight, game.world.height / game.world.width);
    display.render();

  };
  var render = function() {
	 display.drawGameBoard(width, height, game.world.points);
    display.render();

  };

  var update = function(t) {
    game.update(t);
    return;
    
  };

  
  var display        = new Display(document.querySelector("canvas"));
  var game           = new Game();
  var engine         = new Engine(1000/30, render, update);
  
	const width = game.world.width;
	const height = game.world.height;

  display.buffer.canvas.height = height;
  display.buffer.canvas.width  = width;
  display.buffer.imageSmoothingEnabled = false; //  sure??  ************************************************************************************!!!!!!!!!

    game.world.setup();
      resize();
      engine.start();

	  
	    window.addEventListener("resize" , resize);

});