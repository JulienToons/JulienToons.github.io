
window.addEventListener("load", function(event) {

  "use strict";
  const AssetsManager = function() {

    this.img = undefined;

  };
  function createDiv(id, adult= document.getElementById("container")){
	  var newElement = document.createElement("div");
	  newElement.setAttribute("id", id);
	  adult.appendChild(newElement);
	  return newElement;
  };
  function createHTMLimg(src,left = "0%", Top = "0%", depth = "10", adult = document.getElementById("container")) {
	  try{
    var newElement;
	if(!src){
		newElement = document.createElement("font");
		newElement.setAttribute("color", "white");
		newElement.setAttribute("left", left);
		newElement.setAttribute("top", Top);
		//newElement.setAttribute("z-index", depth);
		newElement.innerHTML = "ERROR";

		console.log("Successfuly displayed error");
		
	}
	else{
		newElement = document.createElement("img");
		newElement.setAttribute("src", src);
		newElement.setAttribute("left", left);
		newElement.setAttribute("top", Top);

		//newElement.setAttribute("z-index", depth);
		console.log("Successfuly loaded " + src);
	}
	newElement.style.zIndex=depth;
	adult.appendChild(newElement);
	return newElement;
	  }
	  catch(error){
		console.log(`Error with loading ${src}. The error: ${error}`);
	  }
	// var newimg = document.createElement("img");
	// newimg.setAttribute("src", "abc.jpg");
	// document.getElementsByTagName("p")[0].appendChild(newimg);
	// document.getElementById("container").appendChild(createstuff);
	
	//	<img src = "sprites/test.jpg" z-index="-1" width=80% height=20% top="20%" left= "10%">

  };
	
	let div_boarder = createDiv("border");
	let div_controlPanel = createDiv("controlPanel");
	let div_buttonBox = createDiv("buttonBox");
	let div_stickyNote = createDiv("stickyNote");
	let div_gameBox = createDiv("gameBox");
	
	let temp_canvas = document.createElement("canvas");
	temp_canvas.appendChild(div_gameBox);
	
	createHTMLimg("sprites/test.jpg");
	//createHTMLimg("sprites/background.png", "40%", "", "-2");
	createHTMLimg(null, "40%","20%","14");
  /*
  var assets_manager = new AssetsManager();
  var controller     = new Controller();
  var display        = new Display(document.querySelector("canvas"));
  var game           = new Game();
  var engine         = new Engine(1000/30, render, update);
*/
  
  
});