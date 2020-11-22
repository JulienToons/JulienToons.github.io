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
	if (el.src.includes("imgs/checkedBox.png")) {
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
//	console.log("searching for: " + val);
	
	let value = val.toLowerCase();

	displayedProjects = [];
	words = value.split(" ");
	for(let i = 0; i<info.length;i++){
		
		let show = false;
		
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
			show = true;
		}
		else{
			show = false;
		}
		
		if(show == true){
			displayedProjects.push(info[i]);
		}
	}
	
//	console.log("search complete");
	
	if(displayedProjects.length <= 0){
		alert("No match for \""+val+"\" found");
		// displayedProjects = [];
	}
	else{
		
	}
	
//	console.log("Sorting...");
	sort();
//	console.log("Sort complete");
//	console.log("Loading Files & Graphics...");
	resize(toggleSwitches[14]);
//	console.log("Resize complete");
//	console.log("Done");
};

sort = function(){
	//order by date
	if(displayedProjects.length > 1){
		displayedProjects = f.shell(displayedProjects);
	}
};

fit = function(str, ln = 27, breakWords = true, breaker = "<br>", splitter = "-"){ // by char
	str = str.trim();
	let lastIndex = 0, previousIndex = 0, i = 0, temp;
//	console.log("str is " + str.length + "chars long");
	safetyLength = (breaker.length) * str.length;
	while (i < str.length && i < safetyLength) {
		temp = str.indexOf(breaker, i);
		i = str.indexOf(" ", i);
		if(temp >=0 && temp <= i){
			i = temp + breaker.length;
			lastIndex = i;
			previousIndex = i;
//			console.log("continued");
			continue;
		}
//		console.log("i = " + i);
//		console.log("last is "+lastIndex+" & previous index is "+previousIndex);
		if(i < 0){
//			console.log("CASE 1");
			if(str.length - lastIndex > ln+4){
//				console.log("CASE 1.1");
				str = str.substring(0, lastIndex+ln).concat(splitter, breaker, str.substring(lastIndex+ln));
			}
			break;
		} else if(breakWords && i - previousIndex > ln){
//			console.log("CASE 2");
			str = str.substring(0, previousIndex + ln).concat(splitter, breaker, str.substring(previousIndex + ln + splitter.length));
			previousIndex = previousIndex + ln + splitter.length;
			lastIndex = i;
		} else if(i - lastIndex > ln){
	//		console.log("CASE 3");
			lastIndex = previousIndex;
			str = str.substring(0, previousIndex).concat(breaker, str.substring(previousIndex+1));
			previousIndex = i + breaker.length;
		} else {
			previousIndex = i;
			i++;
		}
	}
	return str;
};
//console.log(fit("Hi your\nmy hat is george", 12));

resize = function(bool) {
	//sort();
	if(bool == undefined){
		bool = toggleSwitches[14];
	}
	
//	console.log("bool is " + bool);
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
	let _create, create = function (num, tr){
		let td = document.createElement("td"); // box/el
		tr.appendChild(td); 
		td.style.backgroundColor = displayedProjects[num].backgroundColor;
		td.setAttribute("class","hoverableElement");
		td.setAttribute("id","displayedProjectNum"+num);  // changes with disp project
		_create(displayedProjects[num], td);
	};

	_create = function(current_project, td){		
		let projectImg = document.createElement("img");
		projectImg.setAttribute("src", current_project.img);
		projectImg.setAttribute("alt", "Image would be here");
		projectImg.setAttribute("class", "projectImage");
		try {
			let ttemp = current_project.transform;
			if(ttemp != null && ttemp != ""){
				projectImg.style.transform = ttemp;
			}
		}
		catch(error) {
			//console.log(error);
		}
		projectImg.style.WebkitFilter = current_project.imageFilter;
		projectImg.style.filter = current_project.imageFilter;
		try {
			if(typeof current_project.rotation !== 'undefined' && current_project.rotation != null && current_project.rotation != 0){
				let foo = current_project.rotation;
				foo = (typeof foo === String && foo.includes("rotate("))? foo : (typeof foo==='number')? (Math.abs(foo)<3.15)? `rotate(${foo})`: `rotate(${foo}deg)`: `rotate(${foo})`;
				projectImg.style.transform = foo;
			}
		}
		catch(error) {
			console.log(error);
		}
		projectImg.style.width = "100%";
		td.appendChild(projectImg);
		
		let dateNode = document.createElement("a");
		dateNode.setAttribute("class", "dateOfProject");
		dateNode.style.color = current_project.dateTextColor;
		let d = current_project.date;
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
		description = current_project.description;
		switch (description.substring(0,3).toUpperCase()){ // DO NOT USE WITH LINKS
			case "[F]": // fit 
				description = fit(description.substring(3));
				break;
			case "[R]": // remove \ns then fit
				description = fit(description.substring(3).replace(/\n/g, " ").replace(/<br>/g, " "));
				break;
		}
		overlayText.innerHTML = description;
		overlayObj.appendChild(overlayText);
		
		let textContainer = document.createElement("div");
		textContainer.setAttribute("class", "textContainer");
		td.appendChild(textContainer);
		
		let projectTitle = document.createElement("p");
		projectTitle.innerHTML = current_project.title;
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
			for(let i = ((rs) * cols); i< dpl; i++){
				create(i, tr);
			}
			
			for(let i = 0; i< cols-(dpl +1); i++){
				let td = document.createElement("td");
				tr.appendChild(td);
				td.setAttribute("class", "spacer");
			}
		}
	}
	else { // new at top
//		console.log("experimental resize");
		let sub = dpl-1;
		for(let r = 0; r < rs;r++){
			let tr = document.createElement("tr");
			table.appendChild(tr);
			
			for(let i=0;i<cols;i++){
				create(sub - ((r*cols) + i), tr);
			}
		}
		
		if(dpl%cols != 0){
			let tr = document.createElement("tr");
			table.appendChild(tr);
			for(let i = ((rs) * cols); i< dpl; i++){
				create(sub - i, tr);
			}
			
			for(let i = 0; i< cols-(dpl +1); i++){
				let td = document.createElement("td");
				tr.appendChild(td);
				td.setAttribute("class", "spacer");
			}
		}
	}
	
};

window.addEventListener("load", function(event) {
	console.log("V3.04a");  //25 char max
	
    let request = new XMLHttpRequest();
	let callback = function(zone) {
		info = zone;
		let temp = location.href;
		if (location.href.includes("#art")){
			this.shortcut('Art',[true, false, false, false, false, true, false, true, true, true, false, false, false, true, true]);
		} else {
			let temp2 = temp.substr(temp.indexOf("julientoons.github.io/projects/#") + ("julientoons.github.io/projects/#").length );
			console.log(temp + "        ..      XXX" + temp2);
			if(temp2.length <= 0 || temp == "julientoons.github.io/projects" || temp == "julientoons.github.io/projects/" || !temp.includes("#")){
				search();
			}
			else{
				search(temp2);
			}
		}
		//this.shortcut("Projects",[true, false, false, true, false, false, false, true, true, true, false, false, false, true, true]);
    };
    request.addEventListener("load", function(event) {
		callback(JSON.parse(this.responseText));
    }, { once:true });
    request.open("GET", "project_info.json");
    request.send();
	
	window.addEventListener("resize" , resize);

});