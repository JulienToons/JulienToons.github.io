
const Composition = function (raw_data) {

  this.raw_data = raw_data;
  this.buffered_data;
  this.data;

};
Composition.prototype = {

  constructor: Comp,

  start: function () {
  },

  filter: function (...el) {

  },

  refine: function (...el) {

  },

  search: function (...el) {
    var keywords = [];
    var specificity = null;
    for (i in el){
      if (typeof i == Number && i <= 1 && i >= 0){
        specificity = i;
      } else if (typeof i == String){
        keywords = keywords.concat(i.split(" ").map((x)=>x.toLowerCase()));
      }
    }
  
    // note: very expensive. can be much cheaper
    this.buffered_info = this.raw_info; // reset buffer
    if(keywords.length > 0){ this.buffered_info = this.filter(keywords);}    // filter (keywords)
    if()
    if(specificity != null) {this.buffered_info = this.refine(specificity);} // refine (specificity)
  
    
    if(displayedProjects.length <= 0){
      alert("No match for \""+val+"\" found");
      // displayedProjects = [];
    }
    else{
      
    }
    
    console.log("Sorting...");
    sort();
    console.log("Sort complete");
    console.log("Loading Files & Graphics...");
    resize(toggleSwitches[14]);
    console.log("Resize complete");
    console.log("Done");
  }

};



// categories / title special border css in css file by class=title or category
// [[],[]]
//  (stuff in parentheses are extra info that appears on pop-up)
// ["/org 3*4",...] create matrix 3 columns 4 rows from els
// use date to determine if in process or future
// show => true, false, or after date {m,d,y}
// link class = "HL"