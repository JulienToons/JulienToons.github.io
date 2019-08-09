



window.addEventListener("load", function(event) {

	console.log("V1.0012");
  
	var search = function() {
		str = "hi";//document.getElementById("searchTxt").value;
		//alert(str);
		
		// 2 modes:  replace list with relevant stuff     or      chosen: [[[[highlight and move to relevant stuff]]]]
	};
	var resize = function() {
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
		
		let rs = (dpl/cols);
		
		let create = function(num, tr){
			let td = document.createElement("td");
			tr.appendChild(td);
			td.setAttribute("class","hoverableElement");
			td.setAttribute("id","displayedProjectNum"+num);  // changes with disp project
			
			let projectImg = document.createElement("img");
			projectImg.setAttribute("src", displayedProjects[num].img);
			projectImg.setAttribute("alt", "Image would be here");
			projectImg.setAttribute("class", "projectImage");
			projectImg.style.width = "100%";
			//projectImg.setAttribute("-webkit-filter", displayedProjects[num].imageFilter);
			projectImg.setAttribute("filter", displayedProjects[num].imageFilter);
			td.appendChild(projectImg);
			
			let dateNode = document.createElement("a");
			dateNode.setAttribute("class", "dateOfProject");
			let d = displayedProjects[num].date;
			dateNode.innerHTML = d.m + "\\" + d.d + "\\"+d.y;
			td.appendChild(dateNode);
			
			let overlayObj = document.createElement("div");
			projectImg.setAttribute("class", "overlay");
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
		
		for(let r = 0; r < rs;r++){
			let tr = document.createElement("tr");
			table.appendChild(tr);
			
			for(let i=0;i<cols;i++){
				create((r*cols) + i, tr);
			}
		}
		
		if(dpl%cols != 0){
			for(let i = ((rs-1) * cols); i< dpl; i++){// those % at the end
				let tr = document.createElement("tr");
				table.appendChild(tr);
				create(i, tr);
			}
		}
		
	}

	var info;
	var displayedProjects;
	

	
    let request = new XMLHttpRequest();
	let callback = function(zone) {
		info = zone;
		displayedProjects = zone;
	   resize();
    };
    request.addEventListener("load", function(event) {

		
		callback(JSON.parse(this.responseText));

    }, { once:true });
    request.open("GET", "project_info.json");
    request.send();

	
	
	document.getElementById("searchButton").onclick = search();
	
	//window.addEventListener("resize" , resize);

});
