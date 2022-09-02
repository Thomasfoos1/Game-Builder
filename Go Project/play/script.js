//Postion
let Vector2 = class {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    static Difference(v1, v2){
        return new Vector2(v1.x-v2.x, v1.y-v2.y);
    }
    Normalize(){
        let m = this.Magnitude();
      if (m == 0) return new Vector2(0,0);
        return new Vector2(this.x/m, this.y/m);
    }
    Magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    Multiply(s){
      return new Vector2(s * this.x, s * this.y)
    }
  };
  
let Position = class {
    constructor(x, y, rot){
        this.x = x;
        this.y = y;
        this.a = (rot != null) ? rot : 0;
    }
    Move(obj, x, y){
        this.x += x;
        this.y += y;
        
        obj.element.style.left = this.x.toString() + 'px';
        obj.element.style.top = this.y.toString() + 'px';
    }
    Rotate(obj, a){
        this.a += a;
        obj.element.style.transform = "rotate(" + this.a.toString() + "deg)";
    }
}

let Behavior = class {
  constructor(f, a){
    this.func = f;
    this.args = a;
  }
}

//Input handling
var pressedKeys = {};
window.onkeyup = function(e) { pressedKeys[e.key] = false; }
window.onkeydown = function(e) { pressedKeys[e.key] = true; console.log(e.key);}

//Scripts - TODO replace with dynamic loading each cmp func
let MoveCmp = function(obj, args){
    if (pressedKeys['ArrowLeft'])
      obj.position.Move(obj,-args.speed,0);
  if (pressedKeys['ArrowRight'])
      obj.position.Move(obj,args.speed,0);
  if (pressedKeys['ArrowUp'])
      obj.position.Move(obj,0,-args.speed);
  if (pressedKeys['ArrowDown']){
      obj.position.Move(obj,0,args.speed);
  }
  if (pressedKeys['e'])
      obj.position.Rotate(obj,2);
    
}

var ChaseCmp = function(obj, args){
    let pObj = objects['Player'];
  
    let v = Vector2.Difference(pObj.position, obj.position).Normalize();
  obj.position.Move(obj, v.x, v.y);
}

var objects = {obj1: {
	id: "obj1",
	position: new Position(0,0),
	element: document.getElementById("obj1"),
	behaviors: [new Behavior(MoveCmp, {"speed":3}),]
},
obj2: {
	id: "obj2",
	position: new Position(0,0),
	element: document.getElementById("obj2"),
	behaviors: []
},
obj3: {
	id: "obj3",
	position: new Position(120,300),
	element: document.getElementById("obj3"),
	behaviors: []
},
}

//init 
for (const [id, obj] of Object.entries(objects)) {
  obj.element.style.left = obj.position.x.toString() + 'px';
  obj.element.style.top = obj.position.y.toString() + 'px';
}

//run game
var runFrame = function(){
    for (const [id, obj] of Object.entries(objects)) {
      for (let j=0; j<obj.behaviors.length; j++){
          obj.behaviors[j].func(obj, obj.behaviors[j].args);
        }
    }
}
setInterval(runFrame, 10);