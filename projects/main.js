var info;
var displayedProjects;
			
var search;
var resize;

var toggleSwitches = [true, false, true, true, true, true, true, true, true, true, true, true, true, true];
		
function toggleSettings(){ 
	  var x = document.getElementById("settingsContainer");
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

	switch (ele.id){
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
				for(let i = 0; i<toggleSwitches.length;i++){
					toggleSwitches[i] = false;
					document.getElementsByClassName("toggleButton")[i].children[0].src = "imgs/uncheckedBox.png";
				}
				toggleSwitches[1] = true;
				document.getElementById("noneButtonCheck").children[0].src = "imgs/checkedBox.png";
			}
			break;	
		case "allButtonCheck":
			toggleSwitches[0]=result;
			if(result)
			{
				for(let i = 0; i<toggleSwitches.length;i++){
					toggleSwitches[i] = true;
					document.getElementsByClassName("toggleButton")[i].children[0].src = "imgs/checkedBox.png";
				}
				toggleSwitches[1] = false;
				document.getElementById("noneButtonCheck").children[0].src = "imgs/uncheckedBox.png";
			}
			break;
		
		default: console.log("error with "+ele.id);
	}
	
	if(!result){
		toggleSwitches[0] = false;
		document.getElementById("allButtonCheck").children[0].src = "imgs/uncheckedBox.png";
	}
	else if(ele.id != "noneButtonCheck"){
		toggleSwitches[1] = false;
		document.getElementById("noneButtonCheck").children[0].src = "imgs/uncheckedBox.png";
	}
	
};

search = function(val) {
	let value = val.toLowerCase();


	displayedProjects = [];
	words = value.split(" ");
	for(let i = 0; i<info.length;i++){
		console.log("I = "+i);
		let show = false; //false;
		
		if(value != "" && !value.includes("all") && !value.includes("everything")){
			console.log("2");
			let dd = info[i].date;
			let d = " " + dd.m + "" + dd.d + "" + dd.y + "   "+dd.m + "/" + dd.d + "/" + dd.y + "   "+ dd.m + "-" + dd.d + "-" + dd.y + "   "+ dd.m + " " + dd.d + " " + dd.y + "   "+ dd.m + "\\" + dd.d + "\\" + dd.y + " ";
			d = d.toLowerCase();
		
			for(let wordCount = 0; wordCount<words.length;wordCount++){
				console.log("word"+wordCount);
				let str = words[wordCount];
				if( (toggleSwitches[11] && info[i].description.toLowerCase().includes(str))
				 || (toggleSwitches[12] && info[i].title.toLowerCase().includes(str))
				 || (toggleSwitches[13] && info[i].tags.toLowerCase().includes(str))
					){	 
					console.log("4");
					show = true;
				}
			}
			if(toggleSwitches[10] && d.includes(" " + value + " ")){
				show = true;
				console.log("3");
			}
		}
		else {show=true;}
		if	( // if any are true then show is false
				!(
				(info[i].type.toLowerCase().includes("document") && toggleSwitches[2])
			 || (info[i].type.toLowerCase().includes("project") && toggleSwitches[3]) 
			 || (info[i].type.toLowerCase().includes("event") && toggleSwitches[4]) 
			 || (info[i].type.toLowerCase().includes("art") && toggleSwitches[5]) 
			 || (info[i].type.toLowerCase().includes("other") && toggleSwitches[6]) 
			 )
			 
			 ||
			 
			 !(
			    (info[i].state.toLowerCase().includes("old") && toggleSwitches[7])
			 || (info[i].state.toLowerCase().includes("recent") && toggleSwitches[8]) 
			 || (((info[i].state.toLowerCase().includes("in progress")) || (info[i].state.toLowerCase().includes("inprogress")) || (info[i].state.toLowerCase().includes("in-progress"))) && toggleSwitches[9]) 
			  ) 
			){
			console.log("1");
			show = false;
		}
		
		if(show == true){
			console.log("5");
			displayedProjects.push(info[i]);
		}
	}
	
	
	if(displayedProjects.length <= 0){
		alert("No match for \""+val+"\" found");
		displayedProjectNum = info;
	}
	sort();
	resize();
};

sort = function(){
	//order by date
	//shellSortByDate();
	quickSort();
};

dateToNum = function(num){
	let n = num.date;
	//converts date to num in days past year 2000
	let zero = function(num){
		if(num == "-" || num == ""){
			return 2000;
		}
		else return num;
	};
	
	let calc = (zero(n.y) - 2000) * 365;
	calc+= zero(n.d);
	calc += zero(n.m);
	return calc;
};
swap = function (leftIndex, rightIndex){
    let temp = displayedProjects[leftIndex];
    displayedProjects[leftIndex] = displayedProjects[rightIndex];
    displayedProjects[rightIndex] = temp;
};
partition = function (left, right) {
    let pivot = displayedProjects[Math.floor((right + left) / 2)],
        i = left, 
        j = right;
    while (i <= j) {
        while (dateToNum(displayedProjects[i]) < dateToNum(pivot)) {
            i++;
        }
        while (dateToNum(displayedProjects[j]) > dateToNum(pivot)) {
            j--;
        }
        if (i <= j) {
            swap(i, j); 
            i++;
            j--;
        }
    }
    return i;
};
quickSort = function (left = 0, right =displayedProjects.length -1) {
    let index;
    if (displayedProjects.length > 1) {
        index = partition(displayedProjects, left, right); 
        if (left < index - 1) {
            quickSort(displayedProjects, left, index - 1);
        }
        if (index < right) { 
            quickSort(displayedProjects, index, right);
        }
    }
    return displayedProjects;
};

shellSort = function () {
    let increment = displayedProjects.length / 2;
    while (increment > 0) {
        for (i = increment; i < displayedProjects.length; i++) {
            let j = i;
            let temp = displayedProjects[i];
    
            while (j >= increment && dateToNum(displayedProjects[j-increment]) > temp) {
                displayedProjects[j] = displayedProjects[j-increment];
                j = j - increment;
            }
            displayedProjects[j] = temp;
        }
        if (increment == 2) {
            increment = 1;
        } else {
            increment = parseInt(increment*5 / 11);
        }
    }
  return displayedProjects;
}

resize = function() {
	//sort();
	
	let w = window.innerWidth;
	let dpl = displayedProjects.length;
	
	if(dpl <=0) return;
	
	let cols = 0;
	if(w > 1500){ cols =  5;}
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
		projectImg.style.width = "100%";
		//projectImg.setAttribute("-webkit-filter", displayedProjects[num].imageFilter);
		projectImg.style.WebkitFilter = displayedProjects[num].imageFilter;
		projectImg.style.filter = displayedProjects[num].imageFilter;
		td.appendChild(projectImg);
		
		let dateNode = document.createElement("a");
		dateNode.setAttribute("class", "dateOfProject");
		dateNode.style.color = displayedProjects[num].dateTextColor;
		let d = displayedProjects[num].date;
		dateNode.innerHTML = d.m + "/" + d.d + "/"+d.y;
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
	}
	
};



window.addEventListener("load", function(event) {
	console.log("V1.0024");  //25 char max

    let request = new XMLHttpRequest();
	let callback = function(zone) {
		info = zone;
		displayedProjects = zone;
		sort();
	   resize();
    };
    request.addEventListener("load", function(event) {
		callback(JSON.parse(this.responseText));
    }, { once:true });
    request.open("GET", "project_info.json");
    request.send();
	
	window.addEventListener("resize" , resize);

});
