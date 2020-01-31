

const Controller = function() {
  this.up    = new Controller.ButtonInput();
  this.down    = new Controller.ButtonInput();
  this.space    = new Controller.ButtonInput();

  this.keyDownUp = function(type, key_code) {

    var down = (type == "keydown") ? true : false;

    switch(key_code) {
	  case 32: this.space.getInput(down);  break;
      case 38: this.up.getInput(down);    break;
	  case 40: this.down.getInput(down); 


    }

  };

};

Controller.prototype = {
  constructor : Controller
};

Controller.ButtonInput = function() {
  this.active = this.down = false;
};

Controller.ButtonInput.prototype = {
  constructor : Controller.ButtonInput,
  getInput : function(down) {
    if (this.down != down) this.active = down;
    this.down = down;
  }
};