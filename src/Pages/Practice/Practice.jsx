/**
 * The practice page will render the typing speed test and track all data associated with a single practice session.
 */

import React, { useState, useEffect, useRef } from 'react';
import { fetchBuiltInArray, fetchAsyncArray } from "../../utilities/challengeArrGenerator"

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
  let [ characterCount, setCharacterCount ] = useState(0)
  let [ errorCount, setErrorCount ] = useState(0);

  // Effect: if selectedArrayName is null, fetch random words from API for wordArray value.
  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get("https://random-word-api.vercel.app/api?words=10");
      setWordArray(response.data);
    }

    if (!selectedArrayName) {
      fetchData();
    }
    else {
      setWordArray(fetchBuiltInArray(selectedArrayName));
    }
  }, [ selectedArrayName ]);

  return (
    <div className="practice-page-wrapper">
      <StatusBar 
        typingDifficulty={typingDifficulty}
        typingDuration={typingDuration}
        selectedArrayName={selectedArrayName}
      />

      {wordArray  
        ? 
        <TypingScreen 
          wordArray={wordArray} 
          characterCount={characterCount}
          setCharacterCount={setCharacterCount}
          errorCount={errorCount}
          setErrorCount={setErrorCount}
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
