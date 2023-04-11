/**
 * The selection component allows the user to select a 'level' and time setting for the typing challenge.
 */

import React, { useRef } from 'react';

import "./selection.css";

const Selection = ({ typingTime, setTypingTime }) => {

  const handleTimeChange = () => {

  }

  return (
    <div className='selection-wrapper'>
      <div className="upper-selection-menu">

        <div className="upper-selection-difficulty-options">
          <button className="difficulty-selector">
            Easy
          </button>

          <button className="difficulty-selector">
            Medium
          </button>

          <button className="difficulty-selector">
            Hard
          </button>
        </div>

        <div className="upper-selection-time-options">

          <div className="time-options-wrapper">

            <div className="time-decrement time-arrow"> </div>

            <div className="selected-time-display">
              <h3>1</h3>
              <br />
              <h3> Minute </h3>
            </div>

            <div className="time-increment time-arrow"></div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Selection;