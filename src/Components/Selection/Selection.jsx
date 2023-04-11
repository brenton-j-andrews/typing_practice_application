/**
 * The selection component allows the user to select a 'level' and time setting for the typing challenge.
 */

import React from 'react';

import "./selection.css";

const Selection = ({ 
  typingDifficulty, 
  setTypingDifficulty, 
  typingTime, 
  setTypingTime 
}) => {

  return (
    <div className='selection-wrapper'>
      <div className="upper-selection-menu">

        <div className="upper-selection-difficulty-options">
          <button 
          className={
            typingDifficulty === "easy" 
            ? "difficulty-selector selected" 
            : "difficulty-selector"
            }
            onClick={() => {setTypingDifficulty("easy")}}
          >
            Easy
          </button>

          <button className={
            typingDifficulty === "medium" 
            ? "difficulty-selector selected" 
            : "difficulty-selector"
            }
            onClick={() => {setTypingDifficulty("medium")}}
          >
            Medium
          </button>

          <button className={
            typingDifficulty === "hard" 
            ? "difficulty-selector selected" 
            : "difficulty-selector"
            }
            onClick={() => {setTypingDifficulty("hard")}}
          >
            Hard
          </button>
        </div>

        <div className="upper-selection-time-options">

          <div className="time-options-wrapper">

            <div className="selector-arrow-wrapper">
              {typingTime > 1 && 
                <div 
                  className="selector-arrow arrow-left" 
                  onClick={() => {setTypingTime(typingTime - 1)}}
                />
              }
            </div>
            
            
            <div className="selected-time-display">
              <span> { typingTime } {typingTime === 1 ? "minute" : "minutes"} </span> 
            </div>

            <div className="selector-arrow-wrapper">
              {typingTime < 3 && 
                <div 
                  className="selector-arrow arrow-right" 
                  onClick={() => {setTypingTime(typingTime + 1)}}
                />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Selection;