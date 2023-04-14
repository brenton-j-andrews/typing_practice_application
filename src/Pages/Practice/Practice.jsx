/**
 * The practice page will render the typing speed test and track all data associated with a single practice session.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

import { fetchBuiltInArray } from "../../utilities/challengeArrGenerator"

import StatusBar from '../../Components/StatusBar/StatusBar';
import TypingScreen from '../../Components/TypingScreen/TypingScreen';
import Loader from '../../Components/Loader/Loader';
import StatsDisplay from '../../Components/StatsDisplay/StatsDisplay';

import "./practice.css";

const Practice = ({ 
  typingDifficulty, 
  typingDuration, 
  selectedArrayName 
}) => {

  const [ wordArray, setWordArray ] = useState();

  // Session Stat tracking.
  let sessionTime = useRef(Date.now());

  const [ characterCount, setCharacterCount ] = useState(0)
  const [ errorCount, setErrorCount ] = useState(0);

  // Track if session is over, either by running out of time or reaching end of array.
  const [ sessionIsOver, setSessionIsOver ] = useState(false);
  const [ resetSession, setResetSession ] = useState(false);

  const fetchData = useCallback(async () => {
    if (!selectedArrayName) {
      let response = await axios.get("https://random-word-api.vercel.app/api?words=100");
      setWordArray(response.data);
    } else {
      setWordArray(fetchBuiltInArray(selectedArrayName));
    }
  }, [ selectedArrayName ]);

  // Effect: if selectedArrayName is null, fetch random words from API for wordArray value.
  useEffect(() => {
    fetchData()
  }, [ selectedArrayName, fetchData ]);

  // Effect: on sessionIsOver, render pop-up modal to display stats and prompt.
  useEffect(() => {
    if (sessionIsOver) {
      sessionTime.current = Date.now() - sessionTime.current;
    }
  }, [ sessionIsOver ]);


  const renderContent = () => {
    if (!sessionIsOver) {
      return (
        <>
          <StatusBar 
            typingDifficulty={typingDifficulty}
            typingDuration={typingDuration}
            selectedArrayName={selectedArrayName}
            sessionIsOver={sessionIsOver}
            setSessionIsOver={setSessionIsOver}
            resetSession={resetSession}
            setResetSession={setResetSession}
          />

         {wordArray  ? 
            <TypingScreen 
              wordArray={wordArray} 
              characterCount={characterCount}
              setCharacterCount={setCharacterCount}
              errorCount={errorCount}
              setErrorCount={setErrorCount}
              sessionIsOver={sessionIsOver}
              setSessionIsOver={setSessionIsOver}
            />
            :
            <div className="typing-screen-card-wrapper"> 
              <Loader />
            </div>
          }
        </>
      )

    }

    else {
      return (
        <StatsDisplay 
          characterCount={characterCount}
          errorCount={errorCount}
          typingDuration={typingDuration}
        />
      ) 
    }
  }

  return (
    <div className="practice-page-wrapper">
      {renderContent()}
    </div>
  );
};

export default Practice;
