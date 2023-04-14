import React, { useRef } from 'react';

import Countdown from 'react-countdown';
import {useStopwatch } from 'react-timer-hook';


import "./status_bar.css";

const StatusBar = ({
  typingDuration, 
  typingDifficulty, 
  selectedArrayName,
  setSessionIsOver,
}) => {

  // Timer functions for fixed length session.
  const TimerFunction = () => {
    const interval = useRef(Date.now() + (typingDuration * 60000));

    const TimerRender = ({ minutes, seconds }) => {
      let secondsString;
      if (seconds < 10) {
        secondsString = `0${seconds}`
      }
      return (
        <span> {minutes}:{secondsString || seconds}</span>
      )
    }

    return (
      <Countdown 
        date={interval.current}
        renderer={TimerRender}
        onComplete={() => {setSessionIsOver(true)}}
      />
    )
  }

  // Stopwatch functions for non fixed length sessions.
  const StopWatchFunction = () => {
    const { seconds, minutes } = useStopwatch({ autoStart: true });

    const StopWatchRender = () => {
      let secondsString;
      if (seconds < 10) {
        secondsString = `0${seconds}`
      }
      return (
        <span> {minutes}:{secondsString || seconds}</span>
      )
    }

    return (
      StopWatchRender()
    )
  }

  return (
    <div className='status-bar-wrapper'>
      <div className="status-bar-timer">
        <strong className='timer-label'> 

          {selectedArrayName && 
            StopWatchFunction()
          }

          {typingDifficulty &&
            TimerFunction()
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