import "./stats_display.css";

import React from 'react';

const StatsDisplay = ({ characterCount, errorCount }) => {

  let words_per_minute = Math.floor(characterCount / 5);
  let accuracy = (characterCount / (characterCount + errorCount) * 100).toFixed(1);

  return (
    <div className="practice-stats-wrapper">
      <h2 className="stats-header-main"> You Typed {words_per_minute} words per minute! </h2>
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
    </div>
  );
};

export default StatsDisplay;