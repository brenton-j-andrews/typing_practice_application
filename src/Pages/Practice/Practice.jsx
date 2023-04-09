/**
 * The practice page will render the typing speed test and track all data associated with a single practice session.
 */

import React, { useState } from 'react';

import "./practice.css";

const Practice = () => {

  let testString = "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.";
  // let testString = "Lorem ipsum is a silly looking sequence of characters!" 

  // Render DOM elements for display from the typing practice string. Use memotization to avoid heavy re-rendering.
  const renderElementsFromString = () => {
    let wordsArray = testString.split(" ");

    let content = wordsArray.map((word) => {
      word += " ";
      let letters = word.split('');

      return (
        <div className="screen-word">
          {letters.map((letter) => {
            return (
              <div className="screen-letter">
                { letter }
              </div>
            )
          })}
        </div>
      )
    })

    return content;
  }


  return (
    <div className="practice-page-wrapper">

      <div className="practice-page-bar">
        This will be the status bar! Will include a countdown timer and session reset button.
      </div>


      <div className="typing-screen-card-wrapper" style={{ marginTop : '50px'}}>
        <div className="screen-card-content">
          {renderElementsFromString()}
        </div>
      </div>
    </div>
  );
};

export default Practice;