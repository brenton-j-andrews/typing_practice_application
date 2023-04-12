/**
 * The practice page will render the typing speed test and track all data associated with a single practice session.
 */

import React, { useState, useEffect } from 'react';
import { fetchBuiltInArray, fetchAsyncArray } from "../../utilities/challengeArrGenerator"

import StatusBar from '../../Components/StatusBar/StatusBar';
import TypingScreen from '../../Components/TypingScreen/TypingScreen';
import "./practice.css";
import axios from 'axios';

const Practice = ({ 
  typingDifficulty, 
  typingDuration, 
  selectedArrayName 
}) => {

  const [ loading, setLoading ] = useState(true);
  const [ wordArray, setWordArray ] = useState();

  // Effect: if selectedArrayName is null, fetch random words from API for wordArray value.a
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
      <button onClick={() => {setLoading(!loading)}}> tOGGLE </button>
      <StatusBar />
      
      {wordArray  
        ? 
        <TypingScreen wordArray={wordArray} />
        :
        <div className="typing-screen-card-wrapper"> Loading... </div>
      }

    </div>
  );
};

export default Practice;
