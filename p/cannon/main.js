
window.addEventListener("load", function(event) {
	
	
  const AssetsManager = function() {

    this.cannon_img = undefined;
	this.bullet_img = undefined;
	this.bubble_img = undefined;

  };

  AssetsManager.prototype = {

    constructor: Game.AssetsManager,

    requestImage:function(url, callback) {

      let image = new Image();

      image.addEventListener("load", function(event) {

        callback(image);

      }, { once:true });

      image.src = url;

    }

  };
	
  // var functions
  var keyDownUp = function(event) {

    controller.keyDownUp(event.type, event.keyCode);

  };
  var resize = function(event) {

    display.resize(document.documentElement.clientWidth, document.documentElement.clientHeight, height / width);

    display.render();

  };
  var render = function() {
	  //console.log(game.world.width);
	  let cannon = game.world.cannon;
	display.update(game.world.width, game.world.height, cannon);
	
	let bullets = game.world.bullets;
	for(let i = 0; i<bullets.length;i++){	
		display.drawObject(assets_manager.bullet_img, bullets[i].position[0], bullets[i].position[1], bullets[i].radius);	
	}
	
	let bubbles = game.world.bubbles;
	for(let i = 0; i<bubbles.length;i++){	
		display.drawObject(assets_manager.bubble_img, bubbles[i].x, bubbles[i].y, bubbles[i].radius);
		//display.drawRectangle(60,60);//bubbles[i].x, bubbles[i].y, "#222",bubbles[i].radius,bubbles[i].radius);	
		
	}
	
	display.drawCannon(assets_manager.cannon_img, cannon.x, cannon.y,cannon.size, cannon.angle);
	
    display.render();

  };
  var update = function(t) {
	
    //if (controller.left.active) {       console.log("left");           }
    //if (controller.right.active) {            console.log("right");                }
	
	// if (controller.down.active) {     console.log("down");                   }
	// if (controller.space.active) {     console.log("space");                   }
    // if (controller.up.active) { console.log("up");}
	
    //if (controller.up.active) { console.log("up");controller.up.active= false;}//game.world.player.jump();      controller.up= false; }
	
	game.world.cannon.down = controller.down.active;
	game.world.cannon.up = controller.up.active;
	game.world.cannon.fire = controller.space.active;
	
    game.update(t);
    return;
    
  };
	
 
	
  let clearElements = function(){
	xButton.style.display = "none";
	  instructionsText.style.display = "none";
	  settingsContainer.style.display = "none";
	  statsContainer.style.display = "none";
  }
  let createSlider = function(id, txt, position, img = null){
	  let tt=document.createElement("div");
	  tt.setAttribute("class","sliderContainer");
	  
	  let outEle = document.createElement("a");
	  outEle.setAttribute("class", "sliderOutputBox");
	  outEle.innerHTML = txt;
	  let ssyts = "out-"+id;
	  outEle.setAttribute("id", ssyts);
	  tt.appendChild(outEle);
	  
	  let ele = document.createElement("input");
	  ele.setAttribute("type","range");
	  ele.setAttribute("min","1");
	  ele.setAttribute("max","100");
	  ele.setAttribute("value",position + "");
	  ele.setAttribute("class","slider");
	  ele.setAttribute("id",id);
	  tt.appendChild(ele);
	  return [tt, ele, outEle];
  }
  
// initialize elements


  	let sidebar = document.getElementById("sidebar");

    let instructionsText = document.createElement("a");
	instructionsText.setAttribute("id", "instructionsText");
	let tempText = "This is all the info Ill give you.<br><br>not really<br><br>I will tell you that the Up/down arrow keys <br>and the space bar are interesting.<br>Once I saw it preform a magic trick!<br>...<br>POOF!<br><br>...<br><br>This is all the info Ill give you.Thi<br>s is all the info Ill give you.This is <br>all the info Ill give you.This is<br> all the info Ill give you.<br>This is all the info Ill give you.<br>This is all the info Ill give you.<br>This is all the info Ill give you.";
	instructionsText.innerHTML = tempText;
	instructionsText.style.display = "none";
	sidebar.appendChild(instructionsText);
	
	let  xButton= document.createElement("img");
	xButton.setAttribute("id", "xButton");
	xButton.setAttribute("src", "imgs/close-button.png");
	xButton.setAttribute("alt","CLOSE-BUTTON");
	xButton.setAttribute("onMouseUp","return closeButton()");
	sidebar.appendChild(xButton); 
	xButton.style.display = "none";
	
	let statsContainer = document.createElement("div");
	statsContainer.setAttribute("id", "statsContainer");
	sidebar.appendChild(statsContainer);
	statsContainer.style.display = "none";
	
	let scoreText = document.createElement("a");
	statsContainer.appendChild(scoreText);
	scoreText.setAttribute("id", "scoreText");
	scoreText.innerHTML = "Score: 0";
	setInterval(function(){
	  scoreText.innerHTML = "Score: " + game.world.score;
    }, 100);
	
	
	
	let settingsContainer = document.createElement("div");
	settingsContainer.setAttribute("id", "settingsContainer");
	sidebar.appendChild(settingsContainer);
	settingsContainer.style.display = "none";
	
	let settingsTitle = document.createElement("a");
	settingsTitle.setAttribute("class", "subtitle");
	settingsTitle.setAttribute("id", "settingsTitle");
	settingsTitle.innerHTML = "Settings";
	settingsContainer.appendChild(settingsTitle);
	
	let gravitySlider = createSlider("gravitySlider", "GravityScale: 60%", 60); // .6
	settingsContainer.appendChild(gravitySlider[0]);
	
	let turnSpeedSlider = createSlider("turnSpeedSlider", "Turn  Speed: 50%", 50); //5
	settingsContainer.appendChild(turnSpeedSlider[0]);
	
	let bulletSpeedSlider = createSlider("bulletSpeedSlider", "Bullet Speed: 30%", 30);  //30
	settingsContainer.appendChild(bulletSpeedSlider[0]);	
	
	let framesTillFullPowerSlider = createSlider("framesTillFullPowerSlider", "Power Load Time: 30 frames", 30);  //30
	settingsContainer.appendChild(framesTillFullPowerSlider[0]);
	
	
	let spawnRateSlider = createSlider("spawnRateSlider", "Bubble Spawn Rate: 50", 50);  //50
	settingsContainer.appendChild(spawnRateSlider[0]);
	
	let bubbleSpeedSlider = createSlider("bubbleSpeedSlider", "Bubble Speed: 30%", 30);  //3
	settingsContainer.appendChild(bubbleSpeedSlider[0]);
	
	let antiGravitySlider = createSlider("antiGravitySlider", "Bubble's 'gravity': -.63", 18.5);  //-.63
	settingsContainer.appendChild(antiGravitySlider[0]);
	
	let averageBubbleRadiusSlider = createSlider("averageBubbleRadiusSlider", "Average Bubble Size: 40%", 40);  //40
	settingsContainer.appendChild(averageBubbleRadiusSlider[0]);

	/*
	let rerunButton = document.createElement("a");
	rerunButton.setAttribute("id","rerunButton");
	rerunButton.setAttribute("class","button");
	rerunButton.innerHTML = "RERUN WITH<br>NEW VARIABLES";
	rerunButton.setAttribute("margin-left", "0px");
	settingsContainer.appendChild(rerunButton);
	*/
		//other events
	gravitySlider[0].oninput = function() {
		let val = gravitySlider[1].value;
		game.world.gravity = val/100;
		if(val < 10){
			val = " 0" + val;
		}
		else if(val < 100){
			val = " " + val;
		}
		gravitySlider[2].innerHTML = "GravityScale: " + val + "%";
	}
	turnSpeedSlider[0].oninput = function() {
		let val = turnSpeedSlider[1].value;
		game.world.cannon.turnspeed = val/10;
		//console.log(game.world.cannon.turnspeed);
		if(val < 10){
			val = " 0" + val;
		}
		else if(val < 100){
			val = " " + val;
		}
		turnSpeedSlider[2].innerHTML = "Turn  Speed: " + val + "%";
	}
	bulletSpeedSlider[0].oninput = function() {
		let val = bulletSpeedSlider[1].value;
		game.world.cannon.bulletSpeed = val;
		if(val < 10){
			val = " 0" + val;
		}
		else if(val < 100){
			val = " " + val;
		}
		bulletSpeedSlider[2].innerHTML = "Bullet Speed: " + val + "%";
	}
	framesTillFullPowerSlider[0].oninput = function() {
		let val = framesTillFullPowerSlider[1].value;
		game.world.cannon.framesTillFullPower = val;
		if(val < 10){
			val = " 0" + val;
		}
		else if(val < 100){
			val = " " + val;
		}
		framesTillFullPowerSlider[2].innerHTML = "Power Load Time: " + val + " frames";
	}	
	spawnRateSlider[0].oninput = function() {
		let val = spawnRateSlider[1].value;
		game.world.spawnRate = 100-val;
		if(val < 10){
			val = " 0" + val;
		}
		else if(val < 100){
			val = " " + val;
		}
		spawnRateSlider[2].innerHTML = "Bubble Spawn Rate: " + val;
	}	
	bubbleSpeedSlider[0].oninput = function() {
		let val = bubbleSpeedSlider[1].value;
		game.world.bubbleSpeed = val/10;
		if(val < 10){
			val = " 0" + val;
		}
		else if(val < 100){
			val = " " + val;
		}
		bubbleSpeedSlider[2].innerHTML = "Bubble Speed: " + val + "%";
	}	
	antiGravitySlider[0].oninput = function() {
		let val = (antiGravitySlider[1].value -50)  /50;
		game.world.antiGravity = val;
		antiGravitySlider[2].innerHTML = "Bubble's 'gravity': " + val;
	}	
	averageBubbleRadiusSlider[0].oninput = function() {
		let val = averageBubbleRadiusSlider[1].value;
		game.world.averageBubbleRadius = val;
		if(val < 10){
			val = " 0" + val;
		}
		else if(val < 100){
			val = " " + val;
		}
		averageBubbleRadiusSlider[2].innerHTML = "PAverage Bubble Size: " + val + "%";
	}	
	  //  button onclick events
	  
  document.getElementById("instructions").onclick = function () {
	clearElements();
	xButton.style.display = "block";
	instructionsText.style.display = "block";
	resize();
  }
  document.getElementById("play").onclick = function () { };
  // rerunButton.onclick = function () { };
  document.getElementById("stats").onclick = function () {
	  clearElements();
	  statsContainer.style.display = "block";
	  xButton.style.display = "block";
	resize();
  };
  document.getElementById("settings").onclick = function () { 
	clearElements();
  	settingsContainer.style.display = "block";
	xButton.style.display = "block";
	resize();
  };
  document.getElementById("pauseButton").onclick = function () {
	  b = document.getElementById("pauseButton");
		if(b.innerHTML == "Pause"){
			b.innerHTML = "Resume";
			engine.stop();
		} else {
			b.innerHTML = "Pause";
			engine.start();
		}
  };
  document.getElementById("timeSpeedButton").onclick = function () {
	  b = document.getElementById("timeSpeedButton");
		switch (b.innerHTML){
			case "Speed: 1/4":
				engine.timeFactor = 2;
				b.innerHTML = "Speed: 1/2";
				break;
			case "Speed: 1/2":
				engine.timeFactor = 1;
				b.innerHTML = "Speed: 1";
				break;
			case "Speed: 1":
				engine.timeFactor = .5;
				b.innerHTML = "Speed: 2";
				break;
			case "Speed: 2":
				engine.timeFactor = .25;
				b.innerHTML = "Speed: 4";
				break;
			case "Speed: 4":
				engine.timeFactor = 4;
				b.innerHTML = "Speed: 1/4";
				break;
  };}
  document.getElementById("evolutionButton").onclick = function () {
	b = document.getElementById("evolutionButton");
	if(b.innerHTML == "Evolution: Manual"){
		b.innerHTML = "Evolution: AUTO";
		engine.autoTIme = true;
		//console.log("autotimmmmtmt");
	} else {
		engine.autoTIme = false;
		b.innerHTML = "Evolution: Manual";
	}
  }
  setInterval(function(){
	  if(needResize == true){
		  clearElements();
		  
		  needResize = false; 
		  resize();
	  }
  }, 100);

  
  var display        = new Display(document.querySelector("canvas"));
  var game           = new Game(900,500);
  var engine         = new Engine(1000/30, render, update);
  var controller     = new Controller();
  var assets_manager = new AssetsManager();

  
	const width = game.world.width;
	const height = game.world.height;

  display.buffer.canvas.height = height;
  display.buffer.canvas.width  = width;
  display.buffer.imageSmoothingEnabled = false; //  sure??  ************************************************************************************!!!!!!!!!

    game.world.setup();

	assets_manager.requestImage("imgs/cannon_02.png", (image) => {

      assets_manager.cannon_img = image;
	
	  assets_manager.requestImage("imgs/bullet_01.png", (image) => {

		  assets_manager.bullet_img = image;
		  
		  assets_manager.requestImage("imgs/bubble_01.png", (image) => {

			  assets_manager.bubble_img = image;

		  });

	  });
      resize();
      engine.start();

    });
	
    // resize();
    // engine.start();
  
  
  window.addEventListener("keydown", keyDownUp);
  window.addEventListener("keyup"  , keyDownUp);
  window.addEventListener("resize" , resize);

});
