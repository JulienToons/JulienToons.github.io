class sorts {
	static compareDates(one, two){ // true if first is greater
		let zero = function(num){
			if(num == "-" || num == "" || num== null){
				return 0;
			}
			else return num;
		};
		let n1 = one.date;
		let n2 = two.date;
		if(zero(n1.y) == zero(n2.y)){
			if(zero(n1.m) == zero(n2.m)){
				if(zero(n1.d) == zero(n2.d) || (zero(n1.d) > zero(n2.d))){
					return true;
				} else {
					return false;
				}
			}
			else if (zero(n1.m) > zero(n2.m)){
				return true;
			} else {
				return false;
			}
		} else if (zero(n1.y) > zero(n2.y)){
			return true;
		} else {
			return false;
		}
	}
	static test(){
		//quick is for num array
		alert(this.quick([2,9,3,5,12,30,0,2,5,-3]));
	}
	static shell(arr) {
		let increment = Math.floor(arr.length / 2);
		while (increment > 0) {
			for (let i = increment; i < arr.length; i++) {
				let j = i;
				let temp = arr[i];
		
				while (j >= increment ) {
					arr[j] = arr[j-increment];
					//console.log(j);
					if(!this.compareDates(arr[j-increment] , temp)) break;
					j = j - increment;
				}
		
				arr[j] = temp;
			}
		
			if (increment == 2) {
				increment = 1;
			} else {
				increment = parseInt(increment*5 / 11);
			}
		}
	  return arr;
	}
	static swap(list, leftIndex, rightIndex){
		let temp = list[leftIndex];
		list[leftIndex] = list[rightIndex];
		list[rightIndex] = temp;
	}
	static partition(list, left, right) {
		let pivot   = list[Math.floor((right + left) / 2)], //middle element
			i       = left, //left pointer
			j       = right; //right pointer
		while (i <= j) {
			while (list[i] < pivot) {
				i++;
			}
			while (list[j] > pivot) {
				j--;
			}
			if (i <= j) {
				this.swap(list, i, j); //sawpping two elements
				i++;
				j--;
			}
		}
		return i;
	}
	static quick(list, left = 0, right = list.length - 1) {
		let index;
		if (list.length > 1) {
			index = this.partition(list, left, right); //index returned from partition
			if (left < index - 1) { //more elements on the left side of the pivot
				this.quick(list, left, index - 1);
			}
			if (index < right) { //more elements on the right side of the pivot
				this.quick(list, index, right);
			}
		}
		return list;
	}
};

/*
	static swap(leftIndex, rightIndex){
		let temp = displayedProjects[leftIndex];
		displayedProjects[leftIndex] = displayedProjects[rightIndex];
		displayedProjects[rightIndex] = temp;
	};
	static partition(left, right) {
		let pivot = displayedProjects[Math.floor((right + left) / 2)],
			i = left, 
			j = right;
		while (i <= j) {
			while (!compareDates(displayedProjects[i], pivot)) {
				i++;
			}
			//while (compareDates(displayedProjects[j] , pivot)) {
			while (true) {
				let temppp = compareDates(displayedProjects[j] , pivot);
				console.log("hh "+ temppp);
				if(temppp) break;
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
	static quickSort(left = 0, right =displayedProjects.length -1) {
		let index;
		if (displayedProjects.length > 1) {
			console.log("ROUND: "+ left + "  ---  "  + right);
			index = partition(left, right); 
			if (left < index - 1) {
				quickSort(left, index - 1);
			}
			if (index < right) { 
				quickSort(index, right);
			}
		}
		// if (displayedProjects.length > 1) {
			// index = partition(left, right); 
			// if (left < index - 1) {
				// quickSort(index, right);
			// }
			// if (index < right) { 
				// quickSort(left, index - 1);
			// }
		// }
		return displayedProjects;
	};

	static shellSort() {
		
		while (increment > 0) {
			for (i = increment; i < displayedProjects.length; i++) {
				let j = i;
				let temp = displayedProjects[i];
		
				while (j >= increment && compareDates(displayedProjects[j-increment] , temp)) {
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
	};*/
	/*dateToNum = function(num){ // true if first is greater
		let n = num.date;
		//converts date to num in days past year 2000
		let zero = function(num){
			if(num == "-" || num == "" || num== null){
				return 0;
			}
			else return num;
		};
		
		let calc = (zero(n.y) - 2000) * 365;
		calc =  calc + zero(n.d);
		calc = calc + (zero(n.m) * 30.5);
		return calc;
	};*/