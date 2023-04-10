/**
 * The practice page will render the typing speed test and track all data associated with a single practice session.
 */

import React, { useEffect, useState } from 'react';

import "./practice.css";

const Practice = () => {

  let wordArray = ["hello", "world", "I", "am", "Brenton", "J", "Andrews"];

  const [ arrayIndex, setArrayIndex ] = useState(0);
  const [ leftActiveWord, setLeftActiveWord ] = useState(wordArray[arrayIndex]);

  const handleIncrement = () => {
    setLeftActiveWord(wordArray[arrayIndex + 1]);
    setArrayIndex(arrayIndex + 1);
  }

  const handleDecrement = () => {
    setLeftActiveWord(wordArray[arrayIndex - 1]);
    setArrayIndex(arrayIndex - 1);
  }

  return (
    <div className="practice-page-wrapper">

      <div className="practice-page-bar">
        This will be the status bar! Will include a countdown timer and session reset button.
      </div>

      <div className="typing-screen-card-wrapper" style={{ marginTop : '50px'}}>

        <div className="screen-card-content-left">
          {wordArray.map((word, index) => {
            if (index < arrayIndex) {
              return (
                <div className="screen-word word-correct">
                  { word }
                </div>
              )
            }
            else return null;
          })}
        </div>

        <div className="screen-card-content-right">
          <div className="screen-word active-word"> 
            { leftActiveWord } 
          </div>

          {wordArray.map((word, index) => {
            if (index > arrayIndex) {
              return (
                <span className="screen-word">
                  { word }
                </span>
              )
            }
            else return null;
            })}
        </div>
      </div>

      <button onClick={handleIncrement}> Increment </button>
      <button onClick={handleDecrement}> Decrement </button>
    </div>
  );
};

export default Practice;