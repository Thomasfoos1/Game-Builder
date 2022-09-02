import React, { useState, useRef, useContext } from 'react';
import { GameCtx } from '../App';
import { Position } from '../Utility/GameObject';

export default function AddButton(props) {
  const GameSettings = useContext(GameCtx);

  const [state, setState] = useState({color: props.color, handleClick: props.handleClick});
  console.log(state);
  return( 
    <button className = 'round-btn'
    style={{backgroundColor: state.color}}
    onClick={props.onClick}>
        +
    </button>
  );
}