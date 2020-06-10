/*
Class Tree: GameObject
COMPLETE: no
TODO: renderer
EXTRA: 
*/

class GameObject{ // with rudimentary physics & colliders
	constructor(id = Math.round(1000000000 * Math.random()) ,type = "gameobject", quickIndex=0){
    this.transform=undefined;
    this.rigidbody=undefined;
    this.collider=undefined;
    this.renderer=undefined;

		this.connections = []; //OBJ  <<?<< of ids or //objects// this to that connection (only one is neccessary)

		this.tags; // multiple ex: enemy, spike, etc.
		this.layer = 0;
		this.id = id;
		this.type = type; // "gameobject, nexttype, meteorite, player, rigidbody, etc." use indexof(n)==true?

		// this.quickIndex = quickIndex;  use if world uses a dictionary of keys for the obj.s

		this.renderer = new Renderer();

		return {
			obj: this,
			id:this.id // only use if id is secured
		};
	}
	// set setRenderer(r){ this.render = r; }
	set col(v){ this.collider = v; }
	get col(){ return this.collider; }

	get connectionType(connector){
// spring, rotational spring, etc
	}
	get connectionTypes(){
		return this.connections.map(x => connectionType(x))
	}
	addConnection(connection){
		this.connections.push(connection); // push id instead??
	}
	set joints(v){ this.connections = v; }
	get joints(){ return this.connections; }

	callibrateComponents(){
		this.rigidbody.transform = this.transform;
		this.collider.rigidbody = this.rigidbody;
		for(c in this.connections){
			c.base = this;
			// pivot obj rigidbody
		}
	}

	render(display, renderer){
		// maybe put the next line in f.js or display.js or main.js.diplay()?
		// render based on vars in renderer & points on collider
		// one or two rendered objs

		// render connected gameobjects

		// render connections: ie: a line, a bungy, a string, a parabola, etc.
	}
};

/*
  Gameobject
  Position
  Transforms
  Rigidbody2d
  Collider2d

  Soft, Rigid, etc.    body colliders

  connectable joints

  spring, rotational spring, rigid, wheel, etc.   joints
*/