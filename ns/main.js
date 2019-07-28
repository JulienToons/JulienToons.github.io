
window.addEventListener("load", function(event) {
  // var functions
  var keyDownUp = function(event) {

    controller.keyDownUp(event.type, event.keyCode);

  };
  var resize = function(event) {

    display.resize(document.documentElement.clientWidth, document.documentElement.clientHeight, height / width);
    display.render();

  };
  var render = function() {
	  
	 display.update(width, height, game.world.points);
    display.render();

  };
  var update = function(t) {
	
    //if (controller.left.active) {       console.log("left");           }
    //if (controller.right.active) {            console.log("right");                }
	
	if (controller.down.active) {     console.log("down");                   }
	if (controller.space.active) {     console.log("space");                   }
    if (controller.up.active) { console.log("up");controller.up.active= false;}//game.world.player.jump();      controller.up= false; }
	
    game.update(t);
    return;
    
  };
	
 
	
  let clearElements = function(){
	xButton.style.display = "none";
	  instructionsText.style.display = "none";
	  settingsContainer.style.display = "none";
	  statsContainer.style.display = "none";
  }
  let createSlider = function(id, txt, img = null){
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
	  ele.setAttribute("value","50");
	  ele.setAttribute("class","slider");
	  ele.setAttribute("id",id);
	  tt.appendChild(ele);
	  return [tt, ele, outEle];
  }
  
// initialize elements

  	let sidebar = document.getElementById("sidebar");

    let instructionsText = document.createElement("a");
	instructionsText.setAttribute("id", "instructionsText");
	let tempText = "This is all the info Ill give you.<br>This is all the info Ill give you.Thi<br>s is all the info Ill give you.This is <br>all the info Ill give you.This is<br> all the info Ill give you.<br>This is all the info Ill give you.<br>This is all the info Ill give you.<br>This is all the info Ill give you.";
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
	
	
	
	let settingsContainer = document.createElement("div");
	settingsContainer.setAttribute("id", "settingsContainer");
	sidebar.appendChild(settingsContainer);
	settingsContainer.style.display = "none";
	
	let settingsTitle = document.createElement("a");
	settingsTitle.setAttribute("class", "subtitle");
	settingsTitle.setAttribute("id", "settingsTitle");
	settingsTitle.innerHTML = "Settings";
	settingsContainer.appendChild(settingsTitle);
	
	let timeSlider = createSlider("timeSlider", "Time-Limit: 50sec");
	settingsContainer.appendChild(timeSlider[0]);
	
	let reproductionSlider = createSlider("reproductionSlider", "Reproduction: asexual");
	settingsContainer.appendChild(reproductionSlider[0]);	
	
	let popSizeSlider = createSlider("popSizeSlider", "PopulationBatchSize: 50");
	settingsContainer.appendChild(popSizeSlider[0]);
	
	let learningRateSlider = createSlider("learningRateSlider", "Learning Rate: 50%");
	settingsContainer.appendChild(learningRateSlider[0]);	
	
	let exampleSpeedSlider = createSlider("exampleSpeedSlider", "Ex. Speed: 50");
	settingsContainer.appendChild(exampleSpeedSlider[0]);
		
	
	
	let rerunButton = document.createElement("a");
	rerunButton.setAttribute("id","rerunButton");
	rerunButton.setAttribute("class","button");
	rerunButton.innerHTML = "RERUN WITH<br>NEW VARIABLES";
	rerunButton.setAttribute("margin-left", "0px");
	settingsContainer.appendChild(rerunButton);
	
		//other events
	timeSlider[0].oninput = function() {
		let str = timeSlider[1].value + "";
		if(str < 10){
			str = " 0" + str;
		}
		else if(str < 100){
			str = " " + str;
		}
		timeSlider[2].innerHTML = "Time-Limit:" + str + "sec";
	}
	reproductionSlider[0].oninput = function() {
		if(reproductionSlider[1].value<=50){
			reproductionSlider[2].innerHTML = "Reproduction: Asexual";
		}
		else{
			reproductionSlider[2].innerHTML = "Reproduction:  Sexual";
		}
	}
	popSizeSlider[0].oninput = function() {
		let str = popSizeSlider[1].value + "";
		if(str < 10){
			str = " 0" + str;
		}
		else if(str < 100){
			str = " " + str;
		}
		popSizeSlider[2].innerHTML = "PopulationBatchSize:" + str;
	}
	learningRateSlider[0].oninput = function() {
		let str = learningRateSlider[1].value + "";
		if(str < 10){
			str = " 0" + str;
		}
		else if(str < 100){
			str = " " + str;
		}
		learningRateSlider[2].innerHTML = "Learning Rate:" + str + "%";
	}
	exampleSpeedSlider[0].oninput = function() {
		let str = exampleSpeedSlider[1].value + "";
		if(str < 10){
			str = " 0" + str;
		}
		else if(str < 100){
			str = " " + str;
		}
		exampleSpeedSlider[2].innerHTML = "Ex. Speed:" + str;
	}
	
	
	  //  button onclick events
	  
  document.getElementById("instructions").onclick = function () {
	clearElements();
	xButton.style.display = "block";
	instructionsText.style.display = "block";
	resize();
  }
  document.getElementById("play").onclick = function () { };
  rerunButton.onclick = function () { };
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
  var game           = new Game();
  var engine         = new Engine(1000/30, render, update);
  var controller     = new Controller();
  
	const width = game.world.width;
	const height = game.world.height;

  display.buffer.canvas.height = height;
  display.buffer.canvas.width  = width;
  display.buffer.imageSmoothingEnabled = false; //  sure??  ************************************************************************************!!!!!!!!!

    game.world.setup();

	
    resize();
    engine.start();
  
  
  window.addEventListener("keydown", keyDownUp);
  window.addEventListener("keyup"  , keyDownUp);
  window.addEventListener("resize" , resize);

});
