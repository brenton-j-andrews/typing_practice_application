import React, { useEffect } from 'react';

import CountDown from '../TimeControl/CountDown';

import { useStopwatch } from 'react-timer-hook';


import "./status_bar.css";

const StatusBar = ({
  typingDuration, 
  typingDifficulty, 
  selectedArrayName,
  sessionIsOver,
  setSessionIsOver
}) => {

  const { seconds, minutes, pause, reset } = useStopwatch({ autoStart: true });

  useEffect(() => {
    if (sessionIsOver) pause();
  }, [ sessionIsOver ])


  return (
    <div className='status-bar-wrapper'>
      <div className="status-bar-timer">
        <strong className='timer-label'> 

          {selectedArrayName && 
            <> {minutes}:{seconds} </>
          }

          {typingDifficulty &&
            <CountDown 
              typingDuration={typingDuration}
              setSessionIsOver={setSessionIsOver}
            />
          }
        </strong>
      </div>

      <div className="status-bar-right">
        {selectedArrayName &&
          <h3 className="status-bar-title"> {selectedArrayName} </h3>
        }

        {typingDifficulty &&
          <h3 className="status-bar-title"> 
            {typingDifficulty} - {typingDuration === 1 ? '1 Minute' : `${typingDuration} minutes`}
          </h3>
        }

        <div className="status-bar-right-lower">
          <button className="status-action-btn return"> Return </button>
          <button className="status-action-btn reset" onClick={reset}> Reset </button>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;