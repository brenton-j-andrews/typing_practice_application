import React, { useRef, useState, useContext } from 'react';
import axios from '../../utilities/axios';

import AuthContext from '../../context/AuthProvider';

import "./stats_display.css";

const StatsDisplay = ({ 
  characterCount, 
  errorCount, 
  typingDuration, 
  sessionStartTime
 }) => {

  const { auth } = useContext(AuthContext);
  const [ errorMessage, setErrorMessage ] = useState("");

  let session_duration = useRef(Date.now() - sessionStartTime.current);
  let display_header = "";
  let words_per_minute;
  let accuracy = (characterCount / (characterCount + errorCount) * 100).toFixed(1);

  if (!typingDuration) {
    let seconds = (session_duration.current / 1000).toFixed(2);
    words_per_minute = ((60 * (characterCount / 5)) / seconds).toFixed(1);
    display_header = `You typed at ${words_per_minute} words per minute!`
  }
  
  else {
    words_per_minute = Math.floor((characterCount / 5) / typingDuration);
    display_header = `You typed at ${words_per_minute} words per minute!`
  }

  const sendSessionData = async() => {
    if (auth?.username) {
      try {
        axios.post(`/stats/${auth.username}/addSession`, 
          JSON.stringify({ words_per_minute, accuracy }),
          {
            headers : { 'Content-Type' : 'application/json' },
            withCredentials: true
          }
        )
      }

      catch (error) {
        if (!error?.response) {
          setErrorMessage("There is a problem with the server, try again later.");
        } else if (error.response?.status === 401) {
          setErrorMessage("User not found.")
        } else {
          setErrorMessage("An issue has occured and your session has not been saved.");
        }
      }
    }
  }

  sendSessionData();

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

        {
          auth 
            ? (
              <div className="create-account-prompt"> 
                {errorMessage && "there is an error."}
                {!errorMessage && 
                  <span> Session logged! Click <a href="/account">here</a> to see your progress! </span>
                }
              </div>
            )
            : (
              <div className="create-account-prompt">
                Want to track your progress? Click <a className="link" href="/register">here</a> to create a free account.
              </div>
              )
        }

        <div className="stats-lower-btns">
          <a className="stats-lower-btn" href="/"> Return Home</a>
          <button className="stats-lower-btn"> Try Again </button>
        </div>
      </div>

    </div>
  );
};

export default StatsDisplay;