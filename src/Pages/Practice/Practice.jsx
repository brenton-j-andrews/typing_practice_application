/**
 * The practice page will render the typing speed test and track all data associated with a single practice session.
 */

import React, { useState, useEffect, useRef } from 'react';
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

  // Effect: if selectedArrayName is null, fetch random words from API for wordArray value.
  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get("https://random-word-api.vercel.app/api?words=100");
      setWordArray(response.data);
    }

    if (!selectedArrayName) {
      fetchData();
    }
    else {
      setWordArray(fetchBuiltInArray(selectedArrayName));
    }
  }, [ selectedArrayName ]);

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
        />
      ) 
    }
  }

  return (
    <div className="practice-page-wrapper">
      {renderContent()}
{/* 
      {wordArray  
        ? 
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

      {sessionIsOver &&
        <StatsDisplay 
          characterCount={characterCount}
          errorCount={errorCount}
        />
      } */}

    </div>
  );
};

export default Practice;
