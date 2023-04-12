import React, { useEffect, useState } from 'react';

import "./status_bar.css";

const StatusBar = ({typingDuration, typingDifficulty}) => {

  return (
    <div className='status-bar-wrapper'>
      <div className="status-bar-timer">
        <strong className='timer-label'> 60 </strong> <br/> <span className='stats-label'>seconds</span>
      </div>

      <div className="status-bar-right">
        <h3 className="status-bar-title">
          {typingDifficulty} - { typingDuration } {typingDuration === 1 ? "minute" : "minutes"} 
        </h3>

        <div className="status-bar-right-lower">
          <button className="status-action-btn"> Return </button>
          <button className="status-action-btn"> Reset </button>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;