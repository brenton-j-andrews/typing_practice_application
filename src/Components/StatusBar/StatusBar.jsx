import React, { useRef, useState } from 'react';

import "./status_bar.css";

const StatusBar = ({typingDuration, typingDifficulty, selectedArrayName}) => {

  let minutes = useRef(selectedArrayName ? 0 : typingDuration);
  let seconds = useRef(0);

  const [ dateString, setDateString ] = useState(`${minutes.current}:00`);

  const updateTimer = () => {
    setInterval(function() {

      // Stopwatch.
      if (selectedArrayName) {
        if (seconds.current === 59) {
          seconds.current = 0;
          minutes.current ++;
        } else {
          seconds.current++;
        }
      }

      // Timer
      else {
        if (seconds.current === 0) {
          seconds.current = 59;
          minutes.current--;
        } else {
          seconds.current--;
        }

        seconds.current < 10 
        ? setDateString(`${minutes.current}:0${seconds.current}`)
        : setDateString(`${minutes.current}:${seconds.current}`)

      }
    }, 1000);
  }


  return (
    <div className='status-bar-wrapper'>
      <button onClick={() => {updateTimer()}}> Click </button>
      <div className="status-bar-timer">
        <strong className='timer-label'> {dateString} </strong>
      </div>

      <div className="status-bar-right">
        <h3 className="status-bar-title">
          { selectedArrayName } || {typingDifficulty} - { typingDuration } {typingDuration === 1 ? "minute" : "minutes"} 
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