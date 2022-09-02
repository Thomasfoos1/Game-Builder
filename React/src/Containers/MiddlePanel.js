import React, { useState, useRef } from 'react';
import LeftPanel from './LeftPanel';
import Popup from 'reactjs-popup';
import TransformCmp from '../ObjComponents/TransformCmp.js';
import AddButton from '../DisplayComponents/AddButton';
import MoveCmp from '../ObjComponents/MoveCmp';
import SpriteCmp from '../ObjComponents/SpriteCmp';

export default function MiddlePanel(){
    const dragItem = useRef();
    const dragOverItem = useRef();
    const [list, setList] = useState([<TransformCmp/>, <MoveCmp/>, <SpriteCmp/>]);
    
    const dragStart = (e, position) => {
        dragItem.current = position;
    };
    
    const dragEnter = (e, position) => {
        dragOverItem.current = position;
    };

    const drop = (e) => {
        const copyListItems = [...list];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setList(copyListItems);
      };

    return <div className="middle-panel box">
    <div className='btn-div'>
      <Popup
      trigger={
        <button className = 'round-btn'
        style={{backgroundColor: "#48abe0"}}>
            +
        </button>
      }
      position="bottom center"
      closeOnDocumentClick
      mouseLeaveDelay={300}
      mouseEnterDelay={0}
      contentStyle={{ padding: '10px', border: '1px', backgroundColor: "#48abe0"}}
      arrow={false}
    >
      <div className="menu">
        <div className="menu-item"> item 1</div>
        <div className="menu-item"> item 2</div>
        <div className="menu-item"> item 3</div>
      </div>
    </Popup>
    </div>
    <>
    {
    list&&
    list.map((item, index) => (
      <div className = "obj-item"
        onDragStart={(e) => dragStart(e, index)}
        onDragEnter={(e) => dragEnter(e, index)}
        onDragEnd={drop}
        key={index}
        draggable>
          {item}
      </div>
      ))}
    </>
  </div>;
}