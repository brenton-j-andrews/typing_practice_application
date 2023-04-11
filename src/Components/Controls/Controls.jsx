import React from 'react';

import "./controls.css";

const Controls = () => {

  return (
    <div className="controls-wrapper">

      <div className="controls-left">
        <button className="control-btn reset" disabled={true}>
          Reset
        </button>

        <button className="control-btn stop" disabled={true}>
          Stop
        </button>
      </div>

      <button className="start-btn" disabled={false}>
        Start Session
      </button>
    </div>
  );
};

export default Controls;