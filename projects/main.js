var info;
var displayedProjects;
	
		
var search;
var resize;

var toggleSwitches = [true, false, true, true, true, true, true, true, true, true, true, true, true, true, true];
		
function shortcut(title = "Projects", val){
	document.getElementById("page_title").innerHTML = title;
	let temp = toggleSwitches;
	toggleSwitches = val;
	search();
	toggleSwitches = temp;
};
		
function toggleSettings(){ 
	  let x = document.getElementById("settingsContainer");
	  if (x.style.display === "block") {
		x.style.display = "none";
	  } else {
		x.style.display = "block";
	  }
};

function toggleCheck(ele){ 
	let el = ele.children[0];
	let result;
	if (el.src.includes("imgs/checkedBox.png")) {// indexOf or includes, that is my question
		result = false;
		el.src = "imgs/uncheckedBox.png";
	} else {
		result = true;
		el.src = "imgs/checkedBox.png";
	}
	let on = true;
	
	switch (ele.id){
		case "newToOldButtonCheck":
			toggleSwitches[14]=result;
			on = false;
			break;
		case "byTagButtonCheck":
			toggleSwitches[13]=result;
			break;
		case "byTitleButtonCheck":
			toggleSwitches[12]=result;
			break;
		case "byDescriptionButtonCheck":
			toggleSwitches[11]=result;
			break;
		case "byDateButtonCheck":
			toggleSwitches[10]=result;
			break;
		case "inProgressButtonCheck":
			toggleSwitches[9]=result;
			break;
		case "recentButtonCheck":
			toggleSwitches[8]=result;
			break;
		case "oldButtonCheck":
			toggleSwitches[7]=result;
			break;
		case "otherButtonCheck":
			toggleSwitches[6]=result;
			break;
		case "artButtonCheck":
			toggleSwitches[5]=result;
			break;
		case "eventsButtonCheck":
			toggleSwitches[4]=result;
			break;
		case "projectsButtonCheck":
			toggleSwitches[3]=result;
			break;
		case "documentsButtonCheck":
			toggleSwitches[2]=result;
			break;
		case "noneButtonCheck":
			toggleSwitches[1]=result;
			if(result)
			{
				for(let i = 0; i<toggleSwitches.length-1;i++){  // -1 is for the 15th element
					toggleSwitches[i] = false;
					document.getElementsByClassName("toggleButton")[i].children[0].src = "imgs/uncheckedBox.png";
				}
				toggleSwitches[1] = true;
				document.getElementById("noneButtonCheck").children[0].src = "imgs/checkedBox.png";
				
				toggleSwitches[0] = false;
				document.getElementById("allButtonCheck").children[0].src = "imgs/uncheckedBox.png";
			}
			on = false;
			break;	
		case "allButtonCheck":
			toggleSwitches[0]=result;
			if(result)
			{
				for(let i = 0; i<toggleSwitches.length-1;i++){
					toggleSwitches[i] = true;
					document.getElementsByClassName("toggleButton")[i].children[0].src = "imgs/checkedBox.png";
				}
				toggleSwitches[1] = false;
				document.getElementById("noneButtonCheck").children[0].src = "imgs/uncheckedBox.png";
			}
			break;
		
		default: console.log("error with "+ele.id);
	}
	
	if(!result && on){
		toggleSwitches[0] = false;
		document.getElementById("allButtonCheck").children[0].src = "imgs/uncheckedBox.png";
	}
	else if(ele.id != "noneButtonCheck" && on){
		toggleSwitches[1] = false;
		document.getElementById("noneButtonCheck").children[0].src = "imgs/uncheckedBox.png";
	}
	
};
printValues = function(arr){
	for(let i = 0; i<arr.length;i++){
		console.log("Element " + i + ": " + arr[i]);
	}
};
search = function(val ="") {
	console.log("searching for: " + val);
	
	let value = val.toLowerCase();
	//printValues(toggleSwitches);

	displayedProjects = [];
	words = value.split(" ");
	for(let i = 0; i<info.length;i++){
		
		let show = false; //false;
		
		if(value != "" && value != null && !(value.indexOf("all")  >= 0) && !(value.indexOf("everything") >= 0)){  // indexOf or includes?
			
			let dd = info[i].date;
			let d = " " + dd.m + "" + dd.d + "" + dd.y + "   "+dd.m + "/" + dd.d + "/" + dd.y + "   "+ dd.m + "-" + dd.d + "-" + dd.y + "   "+ dd.m + " " + dd.d + " " + dd.y + "   "+ dd.m + "\\" + dd.d + "\\" + dd.y + " ";
			d = d.toLowerCase();
		
			for(let wordCount = 0; wordCount<words.length;wordCount++){
				let str = words[wordCount];
				if( (toggleSwitches[11] && info[i].description.toLowerCase().indexOf(str)  >= 0)
				 || (toggleSwitches[12] && info[i].title.toLowerCase().indexOf(str) >= 0)
				 || (toggleSwitches[13] && info[i].tags.toLowerCase().indexOf(str) >= 0)
					){	 
					show = true;
				}
			}
			if(toggleSwitches[10] && (d.indexOf(value)  >= 0 || value.indexOf((dd.y + "").trim()) >= 0)){
				show = true;
			}
		}
		else {show=true;}
		//console.log(info[i].type + " " );
		if	( show &&
			(
				(info[i].type.toLowerCase().indexOf("doc") >= 0 && toggleSwitches[2])
			 || (info[i].type.toLowerCase().indexOf("proj")  >= 0 && toggleSwitches[3]) 
			 || (info[i].type.toLowerCase().indexOf("event")  >= 0 && toggleSwitches[4]) 
			 || (info[i].type.toLowerCase().indexOf("art")  >= 0 && toggleSwitches[5]) 
			 || ((info[i].type.toLowerCase().indexOf("other")  >= 0 || info[i].type.toLowerCase().indexOf("othr")  >= 0)&& toggleSwitches[6]) 
			 )
			 
			 &&
			 
			 (
			    (info[i].state.toLowerCase().indexOf("old")    >= 0 && toggleSwitches[7])
			 || (info[i].state.toLowerCase().indexOf("recent")  >= 0 && toggleSwitches[8]) 
			 || (((info[i].state.toLowerCase().indexOf("in progress")  >= 0) || (info[i].state.toLowerCase().indexOf("inprogress")  >= 0) || (info[i].state.toLowerCase().indexOf("in-progress")  >= 0)) && toggleSwitches[9]) 
			  ) 
			){
				
				/*
				
				if	( !(
				(info[i].type.toLowerCase().indexOf("doc") >= 0 || !toggleSwitches[2])
			 && (info[i].type.toLowerCase().indexOf("proj")  >= 0 || !toggleSwitches[3]) 
			 && (info[i].type.toLowerCase().indexOf("event")  >= 0|| !toggleSwitches[4]) 
			 && (info[i].type.toLowerCase().indexOf("art")  >= 0|| !toggleSwitches[5]) 
			 && ((info[i].type.toLowerCase().indexOf("other")  >= 0 || info[i].type.toLowerCase().indexOf("othr")  >= 0)|| !toggleSwitches[6]) 
			 )
			 
			 ||
			 
			 (
			    (info[i].state.toLowerCase().indexOf("old")    >= 0 || !toggleSwitches[7])
			 && (info[i].state.toLowerCase().indexOf("recent")  >= 0 || !toggleSwitches[8]) 
			 && (((info[i].state.toLowerCase().indexOf("in progress")  >= 0) || (info[i].state.toLowerCase().indexOf("inprogress")  >= 0) || (info[i].state.toLowerCase().indexOf("in-progress")  >= 0)) || !toggleSwitches[9]) 
			  ) 
			){
				*/
				//console.log("out! _----------");
			show = true;
		}
		else{
			show = false;
			//console.log("in! _----------");
		}
		
		if(show == true){
			//f.print(displayedProjects[i]);
			//console.log("pushed");
			//console.log("l before: "+ info.length + " is " + info[i]);
			displayedProjects.push(info[i]);
			//console.log("l after: "+ info.length + " is " + info[i].type);
		}
	}
	
	console.log("search complete");
	
	if(displayedProjects.length <= 0){
		alert("No match for \""+val+"\" found");
		displayedProjectNum = [];
	}
	else{
		//console.log("l = " + displayedProjects.length+ "     f = " + displayedProjects[0].backgroundColor );
	}
	
	console.log("Sorting...");
	sort();
	//f.printList(displayedProjects);
	//console.log("Sort complete");
	console.log("Loading Files & Graphics...");
	resize(toggleSwitches[14]);
	//f.printList(displayedProjects);
	//console.log("Resize complete");
	console.log("Done");
};

sort = function(){
	//order by date
	if(displayedProjects.length > 1){
		displayedProjects = f.shell(displayedProjects);
	}
	//console.log(displayedProjects.length + "jjj"+displayedProjects[0]);
};

resize = function(bool) {
	//sort();
	if(bool == undefined){
		bool = toggleSwitches[14];
	}
	
	console.log("bool is " + bool);
	let w = window.innerWidth;
	let dpl = displayedProjects.length;
	
	if(dpl <=0) return;
	
	let cols;
	if(w > 2400){ cols =  7;}
	else if(w > 1800){ cols = 6;}
	else if(w > 1500){ cols = 5;}
	else if(w > 1100){ cols = 4;}
	else if(w > 800){ cols = 3;}
	else if(w > 520){ cols = 2;}
	else { cols = 1;}
	
	let table = document.getElementById("project_table");
	
	// remove all child elements from table
	while (table.firstChild) {
		table.removeChild(table.firstChild);
	}
	
	
	
	let create = function(num, tr){
		let td = document.createElement("td");
		tr.appendChild(td);
		td.style.backgroundColor = displayedProjects[num].backgroundColor;
		td.setAttribute("class","hoverableElement");
		td.setAttribute("id","displayedProjectNum"+num);  // changes with disp project
		
		let projectImg = document.createElement("img");
		projectImg.setAttribute("src", displayedProjects[num].img);
		projectImg.setAttribute("alt", "Image would be here");
		projectImg.setAttribute("class", "projectImage");
		try {
			let ttemp = displayedProjects[num].transform;
			if(ttemp != null && ttemp != ""){
				projectImg.style.transform = ttemp;
			}
		}
		catch(error) {
			//console.log(error);
		}
		projectImg.style.width = "100%";
		//projectImg.setAttribute("-webkit-filter", displayedProjects[num].imageFilter);
		projectImg.style.WebkitFilter = displayedProjects[num].imageFilter;
		projectImg.style.filter = displayedProjects[num].imageFilter;
		td.appendChild(projectImg);
		
		let dateNode = document.createElement("a");
		dateNode.setAttribute("class", "dateOfProject");
		dateNode.style.color = displayedProjects[num].dateTextColor;
		let d = displayedProjects[num].date;
		let dytemp = d.y ? d.y : "-";
		let dmtemp = d.m ? d.m : "-";
		if(typeof d.y != "string" && d.y > 2000){ // i could make it be a typeof number?
			d.y = d.y - 2000;
		}
		if(typeof dmtemp== "string" && !(dmtemp == "" || dmtemp == "-" || dmtemp == " " || dmtemp == null)){
			if(dmtemp.toLowerCase().indexOf("jan") >= 0){ dmtemp = 1 }
			else if(dmtemp.toLowerCase().indexOf("jan") >= 0){ dmtemp = 1 }
			else if(dmtemp.toLowerCase().indexOf("feb") >= 0){ dmtemp = 2 }
			else if(dmtemp.toLowerCase().indexOf("mar") >= 0){ dmtemp = 3 }
			else if(dmtemp.toLowerCase().indexOf("apr") >= 0){ dmtemp = 4 }
			else if(dmtemp.toLowerCase().indexOf("may") >= 0){ dmtemp = 5 }
			else if(dmtemp.toLowerCase().indexOf("jun") >= 0){ dmtemp = 6 }
			else if(dmtemp.toLowerCase().indexOf("jul") >= 0){ dmtemp = 7 }
			else if(dmtemp.toLowerCase().indexOf("aug") >= 0){ dmtemp = 8 }
			else if(dmtemp.toLowerCase().indexOf("sep") >= 0){ dmtemp = 9 }
			else if(dmtemp.toLowerCase().indexOf("oct") >= 0){ dmtemp = 10 }
			else if(dmtemp.toLowerCase().indexOf("nov") >= 0){ dmtemp = 11 }
			else if(dmtemp.toLowerCase().indexOf("dec") >= 0){ dmtemp = 12 }
		}
		dateNode.innerHTML = dmtemp + "/" + ((d.d != null && d.d != undefined)? d.d: "-") + "/"+dytemp; // could probrably make this better
		td.appendChild(dateNode);
		
		let overlayObj = document.createElement("div");
		overlayObj.setAttribute("class", "overlay");
		td.appendChild(overlayObj);
		
		let overlayText = document.createElement("div");
		overlayText.setAttribute("class", "boxOverlayText");
		overlayText.innerHTML = displayedProjects[num].description;
		overlayObj.appendChild(overlayText);
		
		let textContainer = document.createElement("div");
		textContainer.setAttribute("class", "textContainer");
		td.appendChild(textContainer);
		
		let projectTitle = document.createElement("p");
		projectTitle.innerHTML = displayedProjects[num].title;
		textContainer.appendChild(projectTitle);
	};
	
	let rs = Math.floor(dpl/cols);
	
	
	if(!bool){ // past at top
		for(let r = 0; r < rs;r++){
			let tr = document.createElement("tr");
			table.appendChild(tr);
			
			for(let i=0;i<cols;i++){
				create((r*cols) + i, tr);
			}
		}
		
		if(dpl%cols != 0){
			let tr = document.createElement("tr");
			table.appendChild(tr);
			for(let i = ((rs) * cols); i< dpl; i++){// those % at the end
				create(i, tr);
			}
			
			for(let i = 0; i< cols-(dpl +1); i++){// those % at the end
				let td = document.createElement("td");
				tr.appendChild(td);
				td.setAttribute("class", "spacer");
			}
		}
	} else { // past at bottom new at top
	
		let add= dpl%cols;
		console.log("else version: dpl: "+dpl);
		if(dpl > cols){
			for(let r = 0; r < ((add == 0)? rs: rs-1);r++){
				let tr = document.createElement("tr");
				table.appendChild(tr);
				
				for(let i=0;i<cols;i++){
					console.log("a");
					create(dpl-1 - ((r*cols) + i), tr);
					console.log("b");
				}
			}
		}
		
		if(add != 0){
			let tr = document.createElement("tr");
			table.appendChild(tr);
			console.log("add: "+add+"  dpl: "+dpl); 
			for(let i = add-1; i>= 0; i=i-1){// those % at the end
				console.log("el "+i);
				create(i, tr);
			}
			
			for(let i = 0; i< cols-(add +1); i++){// those % at the end
				let td = document.createElement("td");
				tr.appendChild(td);
				td.setAttribute("class", "spacer");
			}
		}		
	}
	
	// let trSafe = document.createElement("tr");
	// table.appendChild(trSafe);
	// for(let s = 0; s<cols-1;s++){
		// let td = document.createElement("td");
		// trSafe.appendChild(td);
		// td.setAttribute("class", "spacer");
	// }
	
};



window.addEventListener("load", function(event) {
	console.log("V1.053");  //25 char max
	//f.test();
	//f = new f();
	
    let request = new XMLHttpRequest();
	let callback = function(zone) {
		info = zone;
		this.shortcut("Projects",[true, false, false, true, false, false, false, true, true, true, false, false, false, true, true]);
    };
    request.addEventListener("load", function(event) {
		callback(JSON.parse(this.responseText));
    }, { once:true });
    request.open("GET", "project_info.json");
    request.send();
	
	window.addEventListener("resize" , resize);

});
