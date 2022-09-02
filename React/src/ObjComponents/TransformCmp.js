import React, { useState, useRef, useContext } from 'react';
import { GameCtx } from '../App';
import { Position } from '../Utility/GameObject';

export default function TransformCmp() {
  const GameSettings = useContext(GameCtx);

  const handleChangeX = (event) => {
    GameSettings.getSelectedObj().setPosition(parseInt(event.target.value), null, null);
  }
  const handleChangeY = (event) => {
    GameSettings.getSelectedObj().setPosition(null, parseInt(event.target.value, null));
  }
  const handleChangeR = (event) => {
    GameSettings.getSelectedObj().setPosition(null, null, parseInt(event.target.value));
  }

  return (
    <div className='obj-component'>
      <div style={{backgroundColor: 'rgb(223, 124, 3)',
                  marginLeft: '10px',
                  marginRight: '10px'}} >
        <div style={{textAlign: 'center', fontWeight: 'bold', fontSize: '12px'}}>Transform</div>
        <div>
            Position X:
            <input type="number" onBlur={handleChangeX} style={{width: "50px", marginLeft: "20px"}}/>
        </div>
        <div>
            Position Y:
            <input type="number"onBlur={handleChangeY} style={{width: "50px", marginLeft: "20px"}}/>
        </div>
        <div>
            Rotation:
            <input type="number" style={{width: "50px", marginBottom: "10px", marginLeft: "20px"}} onBlur={handleChangeR}/>
        </div>
      </div>
    </div>
  );
}