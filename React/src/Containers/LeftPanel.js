import React, { useState, useRef, useContext, useEffect } from 'react';
import { GameCtx } from '../App';
import AddButton from '../DisplayComponents/AddButton';

export default function LeftPanel(){
    const [objIdx, setObjIdx] = useState(0);
    const GameSettings = useContext(GameCtx);

    const setSeletedObject = (idx) => {
        setObjIdx(idx);
        GameSettings.setSelectedObj(idx);
    }
    
    const [options, setOptions] = useState([
        GameSettings.getSelectedObj().id
    ]);
    const optionsRef = useRef({});
    optionsRef.current = options;

    const clickObject = (idx) => {
        setSeletedObject(idx);
    }

    const handleAddObject = () => {
        const copyOptions = [...optionsRef.current];
        var newId = "obj" + (optionsRef.current.length+1).toString()
        copyOptions.push(newId);
        GameSettings.addGameObject(newId);
        setOptions(copyOptions);
    }

    return <div className="left-panel box">
        <div className='btn-div'>
            <AddButton onClick={handleAddObject} color="#48abe0"/>
        </div>
        <>
            {options.map((option, idx) => (
            <div key={idx}
                onClick={() => clickObject(idx)}
                className = "obj-item"
                style={{backgroundColor: (idx === objIdx) ? 'rgb(51, 115, 200)': ''}}>
                {option}
            </div>
            ))}
        </>
    </div>
}