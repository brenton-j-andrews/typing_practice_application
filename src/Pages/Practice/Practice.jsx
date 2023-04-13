/**
 * The practice page will render the typing speed test and track all data associated with a single practice session.
 */

import React, { useState, useEffect } from 'react';
import { fetchBuiltInArray } from "../../utilities/challengeArrGenerator"

import StatusBar from '../../Components/StatusBar/StatusBar';
import TypingScreen from '../../Components/TypingScreen/TypingScreen';
import "./practice.css";
import axios from 'axios';
import Loader from '../../Components/Loader/Loader';

const Practice = ({ 
  typingDifficulty, 
  typingDuration, 
  selectedArrayName 
}) => {

  const [ wordArray, setWordArray ] = useState();

  // Session Stat tracking.
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
      console.log("characters this session: ", characterCount);
    }
  }, [ sessionIsOver ]);

  return (
    <div className="practice-page-wrapper">
      <StatusBar 
        typingDifficulty={typingDifficulty}
        typingDuration={typingDuration}
        selectedArrayName={selectedArrayName}
        setSessionIsOver={setSessionIsOver}
      />

      {wordArray  
        ? 
        <TypingScreen 
          wordArray={wordArray} 
          characterCount={characterCount}
          setCharacterCount={setCharacterCount}
          errorCount={errorCount}
          setErrorCount={setErrorCount}
          sessionIsOver={sessionIsOver}
        />
        :
        <div className="typing-screen-card-wrapper"> 
          <Loader />
        </div>
      } 

    </div>
  );
};

export default Practice;
