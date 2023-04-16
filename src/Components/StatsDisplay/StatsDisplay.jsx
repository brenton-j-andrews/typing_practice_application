import "./stats_display.css";

import React, { useRef } from 'react';

const StatsDisplay = ({ 
  characterCount, 
  errorCount, 
  typingDuration, 
  sessionStartTime
 }) => {

  let session_duration = useRef(Date.now() - sessionStartTime.current);
  let display_header = "";
  let words_per_minute;
  let accuracy = (characterCount / (characterCount + errorCount) * 100).toFixed(1);


  // If non fixed length session.
  if (!typingDuration) {
    let seconds = (session_duration.current / 1000).toFixed(2);
    console.log(seconds);
    words_per_minute = ((60 * (characterCount / 5)) / seconds).toFixed(1);
    display_header = `You typed at ${words_per_minute} words per minute!`
  }
  
  else {
    words_per_minute = Math.floor((characterCount / 5) / typingDuration);
    display_header = `You typed at ${words_per_minute} words per minute!`
  }


  return (
    <div className="practice-stats-wrapper">
      <h2 className="stats-header-main">
        {display_header}
      </h2>
      <h3 className="stats-header-secondary"> Great Job! </h3>


      <div className="stats-display-wrapper">
        <div className="stat-wrapper">
          <div className="stat-display">
            {accuracy}%
          </div>
          <span className="stat-label"> accuracy </span>

        </div>

        <div className="stat-wrapper">
          <div className="stat-display">
            {characterCount}
          </div>

          <span className="stat-label"> characters </span>
        </div>

        <div className="stat-wrapper">
          <div className="stat-display">
              {errorCount}
            </div>
            <span className="stat-label"> errors </span>
          </div>
      </div>

      <div className="stats-lower">

        <div className="create-account-prompt">
          Want to track your progress? Click <a className="link" href="/register">here</a> to create a free account.
        </div>

        <div className="stats-lower-btns">
          <button className="stats-lower-btn"> Return Home</button>
          <button className="stats-lower-btn"> Try Again </button>
        </div>
      </div>

    </div>
  );
};

export default StatsDisplay;