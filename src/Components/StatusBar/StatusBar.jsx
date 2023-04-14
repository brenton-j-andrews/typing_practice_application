import React, { useEffect, useRef } from 'react';

import Countdown from 'react-countdown';
import { useStopwatch } from 'react-timer-hook';


import "./status_bar.css";

const StatusBar = ({
  typingDuration, 
  typingDifficulty, 
  selectedArrayName,
  sessionIsOver,
  setSessionIsOver,
}) => {

  const { seconds, minutes, pause } = useStopwatch({ autoStart: true });

  const interval = useRef(Date.now() + (typingDuration * 60000));

  // Effect: puase stopwatch timer (if applicable) on end of session.
  useEffect(() => {
    if (sessionIsOver) pause();
  }, [ sessionIsOver, pause ])

  const countDownRender =({ minutes, seconds }) => {
    return <span> {minutes}:{seconds}</span>
  }

  return (
    <div className='status-bar-wrapper'>
      <div className="status-bar-timer">
        <strong className='timer-label'> 

          {selectedArrayName && 
            <> {minutes}:{seconds} </>
          }

          {typingDifficulty &&
            <Countdown 
              date={interval.current} 
              renderer={countDownRender}
              onComplete={() => {setSessionIsOver(true)}}
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
        </div>
      </div>
    </div>
  );
};

export default StatusBar;