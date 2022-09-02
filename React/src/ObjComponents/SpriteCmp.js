import React, { useState, useRef, useContext } from 'react';
import { GameCtx } from '../App';
import { Position } from '../Utility/GameObject';

export default function SpriteCmp() {
    const cmpName = 'SpriteCmp';
    const GameSettings = useContext(GameCtx);

    const changeImg = (event) => {
        let photo = event.target.files[0];  // file from input

        //upload to server
        let req = new XMLHttpRequest();
        let formData = new FormData();

        let fName = GameSettings.getSelectedObj().id + photo.name.substring(photo.name.lastIndexOf("."));

        formData.append("photo", photo);                                
        req.open("POST", "http://localhost:8080/save/image/" + fName);
        req.send(formData);

        //change img on this component
        GameSettings.getSelectedObj().setSprite("imageUrl", URL.createObjectURL(photo));
        GameSettings.getSelectedObj().setSprite("imageFile", fName);
    }

    const changeHeight = (event) => {
        GameSettings.getSelectedObj().setSprite("height", event.target.value);
    }

    const changeWidth = (event) => {
        GameSettings.getSelectedObj().setSprite("width", event.target.value);
    }
    
    return (
        <div className='obj-component'>
            <div style={{backgroundColor: 'rgb(223, 124, 3)',
                        marginLeft: '10px',
                        marginRight: '10px'}} >
                <div style={{textAlign: 'center', fontWeight: 'bold', fontSize: '12px'}}>Sprite</div>
                <div>
                    Image: 
                    <input type="file" accept="image/*" onChange={changeImg} />
                </div>
                <div>
                    Height:
                    <input type="number" style={{width: "50px", marginLeft: "20px"}} onChange={changeHeight}/>
                </div>
                <div>
                    Width:
                    <input type="number" style={{width: "50px", marginBottom: "10px", marginLeft: "20px"}} onChange={changeWidth}/>
                </div>
            </div>
        </div>
    );
}