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

var a = undefined ?? 100;

//or this._varname = null; for private class var
alert([2, 4].every(isComposite));  // => false (2 is prime, 4 is not)
