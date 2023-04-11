/**
 * The selection component allows the user to select a 'level' and time setting for the typing challenge.
 */

import React, { useState } from 'react';

import "./selection.css";

const Selection = ({ 
  typingDifficulty, 
  setTypingDifficulty, 
  typingDuration, 
  setTypingDuration,
  selectedArrayName,
  setSelectedArrayName
}) => {

  const [ displayLevelDropdown, setDisplayLevelDropdown ] = useState(false);

  const levelSelectionOptions = ["US States", "Countries of the World", "One to One hundred"];

  const handleDifficultyClick = (difficulty) => {
    setSelectedArrayName(null);
    setTypingDifficulty(difficulty);
  }

  const handleDropdownClick = (levelName) => {
    setDisplayLevelDropdown(false);
    setSelectedArrayName(levelName);
    setTypingDifficulty(null);
  } 

  return (
    <div className='selection-wrapper'>
      <span className='selection-prompt'> Select a difficulty and time: </span>

      <div className="upper-selection-menu">
        <div className="upper-selection-difficulty-options">
          <button 
          className={
            typingDifficulty === "easy" 
            ? "difficulty-selector selected" 
            : "difficulty-selector"
            }
            onClick={() => {handleDifficultyClick("easy")}}
          >
            Easy
          </button>

          <button className={
            typingDifficulty === "medium" 
            ? "difficulty-selector selected" 
            : "difficulty-selector"
            }
            onClick={() => {handleDifficultyClick("medium")}}
          >
            Medium
          </button>

          <button className={
            typingDifficulty === "hard" 
            ? "difficulty-selector selected" 
            : "difficulty-selector"
            }
            onClick={() => {handleDifficultyClick("hard")}}
          >
            Hard
          </button>
        </div>

        <div className="upper-selection-time-options">

          <div className="time-options-wrapper">

            <div className="selector-arrow-wrapper">
              {typingDuration > 1 && 
                <div 
                  className="selector-arrow arrow-left" 
                  onClick={() => {setTypingDuration(typingDuration - 1)}}
                />
              }
            </div>
            
            
            <div className="selected-time-display">
              <span> { typingDuration } {typingDuration === 1 ? "minute" : "minutes"} </span> 
            </div>

            <div className="selector-arrow-wrapper">
              {typingDuration < 3 && 
                <div 
                  className="selector-arrow arrow-right" 
                  onClick={() => {setTypingDuration(typingDuration + 1)}}
                />
              }
            </div>
          </div>
        </div>
      </div>

      <span className='selection-prompt'> Or see how fast you can type out the challenges below! </span>

      <div className="lower-selection-menu">

        <div className="level-selection-wrapper" onClick={() => {setDisplayLevelDropdown(!displayLevelDropdown)}}>
          <div className="level-selection-display">
            <span> { selectedArrayName ? selectedArrayName : "Select a challenge:" } </span>
          </div>
          <div className="dropdown-toggle" onClick={() => {setDisplayLevelDropdown(!displayLevelDropdown)}}/>
        </div> 
        
        {displayLevelDropdown &&
          <ul className="level-selection-dropdown">
            {levelSelectionOptions.map((level, index) => {

              return (
                <li 
                  className='level-item' 
                  key={crypto.randomUUID()}
                  onClick={() => {handleDropdownClick(level)}}
                > 
                  {level} 
                </li>
              )
            })}
          </ul>
        }
      </div>
    </div>
  );
};

export default Selection;