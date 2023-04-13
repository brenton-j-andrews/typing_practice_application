import React from 'react';

import "./status_bar.css";

const StatusBar = ({typingDuration, typingDifficulty, selectedArrayName}) => {

  return (
    <div className='status-bar-wrapper'>
      <div className="status-bar-timer">
        <strong className='timer-label'> 
          00:00
        </strong>
      </div>

      <div className="status-bar-right">

        {selectedArrayName &&
          <h3 className="status-bar-title"> {selectedArrayName}</h3>
        }

        {typingDifficulty &&
          <h3 className="status-bar-title"> 
            {typingDifficulty} - {typingDuration === 1 ? '1 Minute' : `${typingDuration} minutes`}
          </h3>
        }

        <div className="status-bar-right-lower">
          <button className="status-action-btn return"> Return </button>
          <button className="status-action-btn reset"> Reset </button>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;