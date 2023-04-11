import React from 'react';

import "./status_bar.css";

const StatusBar = () => {
  return (
    <div className='status-bar-wrapper'>
      <div className="status-bar-timer">
        <strong className='timer-label'> 60 </strong> <br/> <span className='stats-label'>seconds</span>
      </div>
      
      <div className="stats-display-wrapper">
        <div className="stats-display"> 
          0
        </div>
        <span className='stats-label'> words / min </span>
      </div>

      <div className="stats-display-wrapper">
        <div className="stats-display">
          0
        </div>
        <span className='stats-label'> accuaracy </span>
      </div>
    </div>
  );
};

export default StatusBar;