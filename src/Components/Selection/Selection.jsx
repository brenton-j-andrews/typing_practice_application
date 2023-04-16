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

  const levelSelectionOptions = ["US States", "South American Countries", "One to One hundred", "European Countries", "Test Arr"];

  const handleDifficultyClick = (difficulty) => {
    setSelectedArrayName(null);
    setTypingDuration(typingDuration ? typingDuration : 1);
    setTypingDifficulty(difficulty);
  }

  const handleTimeSelection = (increasing) => {
    if (increasing) {
      setTypingDuration(typingDuration ? typingDuration + 2 : 1)
    }
    else {
      setTypingDuration(typingDuration ? typingDuration - 2 : 1)
    }
    setDisplayLevelDropdown(false);
    setTypingDifficulty("Easy")
    setSelectedArrayName(null);
  }

  const handleDropdownClick = (levelName) => {
    setDisplayLevelDropdown(false);
    setSelectedArrayName(levelName);
    setTypingDifficulty(null);
    setTypingDuration(null);
  } 

  return (
    <div className='selection-wrapper'>
      <h3 className='selection-prompt'> Difficulty and time: </h3>

      <div className="upper-selection-menu">
        <div className="upper-selection-difficulty-options">
          <button 
            className={
              typingDifficulty === "Easy" 
              ? "difficulty-selector selected" 
              : "difficulty-selector"
              }
            onClick={() => {handleDifficultyClick("Easy")}}
          >
            Easy
          </button>

          <button className={
            typingDifficulty === "Medium" 
            ? "difficulty-selector selected" 
            : "difficulty-selector"
            }
            onClick={() => {handleDifficultyClick("Medium")}}
          >
            Medium
          </button>

          <button className={
            typingDifficulty === "Hard" 
            ? "difficulty-selector selected" 
            : "difficulty-selector"
            }
            onClick={() => {handleDifficultyClick("Hard")}}
          >
            Hard
          </button>
        </div>

        <div className="time-options-wrapper">
          <div className="selector-arrow-wrapper">
            {typingDuration > 1 && 
              <div 
                className="selector-arrow arrow-left" 
                onClick={() => {handleTimeSelection(false)}}
              />
            }
          </div>
          
          <div className="selected-time-display">
            <span className="time-display"> { typingDuration || '-' } </span> 
            <span className="time-display">{typingDuration === 1 ? "minute" : "minutes"} </span> 
          </div>

          <div className="selector-arrow-wrapper">
            {typingDuration < 5 && 
              <div 
                className="selector-arrow arrow-right" 
                onClick={() => {handleTimeSelection(true)}}
              />
            }
          </div>
        </div>
      </div>

      <span className='selection-prompt'> Or select a challenge: </span>

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