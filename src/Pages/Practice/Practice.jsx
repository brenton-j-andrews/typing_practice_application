/**
 * The practice page will render the typing speed test and track all data associated with a single practice session.
 */

import React, { useState, useRef } from 'react';
import { fetchChallengeArray } from "../../utilities/challengerArrGenerator"

import StatusBar from '../../Components/StatusBar/StatusBar';
import "./practice.css";


const Practice = ({ 
  typingDifficulty, 
  typingDuration, 
  selectedArrayName 
}) => {

  console.log(selectedArrayName);
  let wordArray = fetchChallengeArray(typingDifficulty, typingDuration, selectedArrayName);

  let arrayIndex = useRef(0);
  let wordIndex = useRef(0);

  // Stat variables.
  let errorCount = useRef(0);
  let characterCount = useRef(0);

  // Tracks whether a word was spelt correctly or not for left display rendering.
  let wordStatusArray = useRef([]);

  const [ rightActiveWord, setRightActiveWord ] = useState(wordArray[arrayIndex.current]);
  const [ leftActiveWord, setLeftActiveWord ] = useState("");

  const [ typoPresent, setTypoPresent ] = useState(false);


  const handleInput  = (e) => {

    let typedCharacter = e.target.value.charAt(e.target.value.length - 1).trim();
    document.getElementById("form-input").value = ""; 
    let isCorrectCharacter = typedCharacter === wordArray[arrayIndex.current].charAt(wordIndex.current);

    !isCorrectCharacter && errorCount.current++;

    // Space bar handled in seperate function.
    if (typedCharacter === "") {
      return;
    }

    // If there is a typo, it must be cleared before new input can be added.
    if (!typoPresent) {

       // Correct input provided.
       if (isCorrectCharacter) {
        
        let updatedRight = rightActiveWord.slice(1);
        let updatedLeft = leftActiveWord + rightActiveWord.charAt(0);

        wordIndex.current ++;
        setRightActiveWord(updatedRight);
        setLeftActiveWord(updatedLeft);
      }

      // Incorrect input provided.
      else {
        setLeftActiveWord(leftActiveWord + typedCharacter);
        setTypoPresent(true);
      }
    }
  }

  const handleSpaceAndBackspace = (e) => {

    // Backspace key.
    if (e.keyCode === 8) {

      let updatedLeft = leftActiveWord.slice(0, -1);

      // Clear correct characters.
      if (!typoPresent) {
        let updatedRight = leftActiveWord.charAt(leftActiveWord.length - 1);
        setRightActiveWord(updatedRight + rightActiveWord);
        setLeftActiveWord(updatedLeft);
        if (wordIndex.current > 0) {
          wordIndex.current --;
        }
      }

      // Clear erroneous characters.
      else {
        setLeftActiveWord(updatedLeft);
        setTypoPresent(false);
      } 
    }

    // Spacebar key.
    if (e.keyCode === 32) {
      if (!typoPresent) {
        wordStatusArray.current.push(true);
      }
      else {
        wordStatusArray.current.push(false);
      }

      arrayIndex.current++;
      setRightActiveWord(wordArray[arrayIndex.current]);
      setLeftActiveWord("");
      wordIndex.current = 0;
      setTypoPresent(false);
    }
  } 

  const focusOnHiddenInput = () => {
    document.getElementById("form-input").focus(); 
  }

  return (
    <div className="practice-page-wrapper">

      <StatusBar />

      <div className="typing-screen-card-wrapper" onClick={focusOnHiddenInput} style={{ marginTop : '50px'}}>
        
        <div className="screen-card-content-left">
          {wordArray.map((word, index) => {
            if (index < arrayIndex.current) {
              return (
                <div className={wordStatusArray.current[index] ? "screen-word word-correct" : "screen-word word-incorrect"} key={word + index}>
                  { word }
                </div>
              )
            }
            else return null;
          })}

          <div className={typoPresent ? "screen-word active-left word-incorrect" : "screen-word active-left" }> 
            { leftActiveWord } 
          </div>
        </div>

        <div className="screen-card-content-right">
          <div className="screen-word active-word"> 
            { rightActiveWord } 
          </div>

          {wordArray.map((word, index) => {
            if (index > arrayIndex.current) {
              return (
                <span className="screen-word" key={word + index}>
                  { word }
                </span>
              )
            }
            else return null;
          })}
        </div>
      </div>

      <form action='/'>
        <input 
          id="form-input" 
          type="text" 
          autoFocus 
          className="type-text-input" 
          onChange={handleInput}
          onKeyDown={handleSpaceAndBackspace}
        />
      </form>
    </div>
  );
};

export default Practice;
