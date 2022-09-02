import React, { useContext } from 'react';
import { GameCtx } from '../App';
import { ServerController } from '../Utility/Controller.js';

export default function LeftPanel(){
    const GameSettings = useContext(GameCtx);

    //Save and play the game on server
    const sendPlayReq = () => {
        ServerController.sendSavePlayReq(GameSettings, true);
    }

    //Save the game on server
    const sendSaveReq = () => {
        ServerController.sendSavePlayReq(GameSettings, false);
    }

    return(
        <div className='top-bar'>
            <button className = 'round-btn top-btn' onClick={sendPlayReq}>Play</button>
            <button className = 'round-btn top-btn' onClick={sendSaveReq}>Save</button>
        </div>
    )
}