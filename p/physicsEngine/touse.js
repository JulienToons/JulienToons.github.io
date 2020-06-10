// private IIFE Expression

var className = (function(nm){
  let _privateProperty1 = nm;
  let _pp2 = 1; // private
  return {
    prop3: 1203, //public
    get pp2(){ // accessor
      return _pp2;
    },
    set pp2(s){
      pp2=s;
    }
  }
})();


//or this._varname = null; for private class var