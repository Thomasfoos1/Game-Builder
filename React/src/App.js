import React, { useState, useRef } from 'react';
import './App.css';
import './Utility/GameObject.js';
import MiddlePanel from './Containers/MiddlePanel';
import LeftPanel from './Containers/LeftPanel';
import TopBar from './Containers/TopBar';
import { GameObject } from './Utility/GameObject.js';
import RightPanel from './Containers/RightPanel';

// set the defaults
export const GameCtx = React.createContext();

const App = () => {
  const GameSettings = {
    objIdx: 0,
    objects: {
      obj1: new GameObject('obj1')
    },

    setSelectedObj: function(idx){
      this.objIdx = idx;
    },

    getSelectedObj: function(){
      return Object.values(this.objects)[this.objIdx];
    },

    getObjectArr: function(){
      return Object.values(this.objects);
    },

    addGameObject: function(id){
      this.objects[id] = new GameObject(id);
      this.updateDisplayObjs(this.getObjectArr());
    },

    setBehaviorParam(behavName, paramName, value){
      this.getSelectedObj().behaviors[behavName][paramName] = value;
    },

    setBehaviorParams(behavName, value){
      this.getSelectedObj().behaviors[behavName] = value;
    }
  };

  return <GameCtx.Provider value={GameSettings}>
        <TopBar/>
        <div className="row content-container">
            <LeftPanel/>
            <MiddlePanel/>
            <RightPanel/>
       </div>
    </GameCtx.Provider>
};

export default App;