import React, { useState, useRef, useContext } from 'react';
import { GameCtx } from '../App';

export default function RightPanel(){
    const GameSettings = useContext(GameCtx);
    const [objArr, setObjArr] = useState(GameSettings.getObjectArr());
    GameSettings.updateDisplayObjs = setObjArr;

    return <div className="right-panel box">
    <>
    {
    objArr.map((obj, index) => (
      <div>
          {obj.cmp}
      </div>
      ))}
    </>
  </div>;
}