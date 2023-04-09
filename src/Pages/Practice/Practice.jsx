/**
 * The practice page will render the typing speed test and track all data associated with a single practice session.
 */

import React, { useState } from 'react';

import "./practice.css";

const Practice = () => {

  let testString = "The faster you drive, the more fuel you're using. 55 mph is the optimum speed of the highway.";

  return (
    <div className="practice-page-wrapper">

      <div className="practice-page-bar">
        This will be the status bar! Will include a countdown timer and session reset button.
      </div>


      <div className="typing-screen-card-wrapper" style={{ marginTop : '50px'}}>
        <div className="screen-card-content">

          <div className="screen-word">
            <div className="screen-letter letter-correct"> H </div>
            <div className="screen-letter letter-incorrect"> e </div>
            <div className="screen-letter is-active"> l </div>
            <div className="screen-letter"> l </div>
            <div className="screen-letter"> o </div>
            <div className="screen-letter">  </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Practice;