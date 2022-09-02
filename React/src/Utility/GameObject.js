import React, { Component, useContext, useState } from 'react';
import { GameCtx } from '../App';

//Postion
export let Vector2 = class {
    constructor(x, y, z) {
      this.x = x;
      this.y = y;
    }
    static Difference(v1, v2){
      return new Vector2(v1.x-v2.x, v1.y-v2.y);
    }
    Normalize(){
      let m = this.Magnitude();
      if (m === 0) return new Vector2(0,0);
      return new Vector2(this.x/m, this.y/m);
    }
    Magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    static Multiply(s){
      return new Vector2(s * this.x, s * this.y)
    }
  };
  
  export let Position = class {
      constructor(x, y, rot){
      this.x = x;
      this.y = y;
      this.a = (rot != null) ? rot : 0;
    }
    Move(obj, x, y){
        this.x += x;
      this.y += y;
      
      obj.cmp.style.left = this.x.toString() + 'px';
      obj.cmp.style.top = this.y.toString() + 'px';
    }
    Rotate(obj, a){
        this.a += a;
      obj.cmp.style.transform = "rotate(" + this.a.toString() + "deg)";
    }
  }
  
//Input handling
export var pressedKeys = {};
window.onkeyup = function(e) { pressedKeys[e.key] = false; }
window.onkeydown = function(e) { pressedKeys[e.key] = true; }

export let GameObject = class{
    constructor(name){
        this.id = name;
        this.behaviors = {};
        this.position = new Position(0,0);
        this.cmp = <GameObjectCmp name={this.id}/>
    }

}

const ObjDisplay = (props) => {
  const GameSettings = useContext(GameCtx);
  const [height, setHeight] = useState("50");
  const [width, setWidth] = useState("50");
  const [imageFile, setImageFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const setSpriteWrapper = (key, val) =>{
    let sprite = {
      imageFile: imageFile,
      imageUrl: imageUrl,
      width: width,
      height: height
    };
    sprite[key] = val;
    
    switch(key){
      case "imageFile" :
        setImageFile(sprite.imageFile);
        break;
      case "imageUrl" :      
        setImageUrl(sprite.imageUrl);
        break;
      case "height" :
        setHeight(sprite.height);
        break;
      case "width" :
        setWidth(sprite.width);
        break;
      default:
        break;
    }
    
    GameSettings.objects[props.name].key = sprite;
  }

  //init
  GameSettings.objects[props.name].setSprite = setSpriteWrapper;
  GameSettings.objects[props.name].sprite = {
    imageFile: imageFile,
    imageUrl: imageUrl,
    width: width,
    height: height
  };

  if (imageUrl === ""){
    return <>X</>
  }
  return <img src={imageUrl} 
              alt={props.name}
              style={{height: `${height}px`, width: `${width}px`, display: "inline-block"}}/>
}

const GameObjectCmp = (props)=> {
    const GameSettings = useContext(GameCtx);
    const [posX, setPosX] = useState(0);
    const [posY, setPosY] = useState(0);
    const [angle, setAngle] = useState(0);

    //Method to set one attribute of position at a time
    const setPosition = (x, y, a) => {
      if (x!= null) setPosX(x);
      if (y!= null) setPosY(y);
      if (a!= null) setAngle(a);
      GameSettings.objects[props.name].position = new Position(posX, posY, angle);
    }
    
    GameSettings.objects[props.name].setPosition = setPosition;

    return (
        <div
            style={{
                position: 'absolute',
                left: `${posX}px`,
                top: `${posY}px`,
                transform: `rotate(${angle}deg)`
            }}>
            <ObjDisplay name={props.name}/>
        </div>
    );
}