import React, { useState, useRef, useContext } from 'react';
import { GameCtx } from '../App';

export default function MoveCmp() {
    const cmpName = 'MoveCmp';
    const GameSettings = useContext(GameCtx);

    const changeSpeed = (event) => {
        GameSettings.getSelectedObj().behaviors[cmpName] = {};
        GameSettings.setBehaviorParam(cmpName, 'speed', parseInt(event.target.value));
    }

    const changeLockX = (event) => {
        GameSettings.setBehaviorParam(cmpName, 'lockX', event.target.checked);
    }

    const changeLockY = (event) => {
        GameSettings.setBehaviorParam(cmpName, 'lockY', event.target.checked);
    }
    
    return (
        <div className='obj-component'>
            <div style={{backgroundColor: 'rgb(223, 124, 3)',
                        marginLeft: '10px',
                        marginRight: '10px'}} >
                <div style={{textAlign: 'center', fontWeight: 'bold', fontSize: '12px'}}>Move</div>
                <div>
                    Speed: 
                    <input type="number" onChange={changeSpeed} style={{width: "50px", marginLeft: "20px"}}/>
                </div>
                <div>
                    Lock X:
                    <input type="checkbox"onChange={changeLockX} />
                </div>
                <div>
                    Lock Y:
                    <input type="checkbox" onChange={changeLockY} />
                </div>
            </div>
        </div>
    );
}