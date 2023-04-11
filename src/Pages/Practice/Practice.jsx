/**
 * The practice page will render the typing speed test and track all data associated with a single practice session.
 */

import React, { useState, useRef } from 'react';

import "./practice.css";

const Practice = () => {

  let wordArray = ["hello", "world", "I", "am", "Brenton", "J", "Andrews"];

  let arrayIndex = useRef(0);
  let wordIndex = useRef(0);

  // Tracks whether a word was spelt correctly or not for left display rendering.
  let wordStatusArray = useRef([]);

  const [ rightActiveWord, setRightActiveWord ] = useState(wordArray[arrayIndex.current]);
  const [ leftActiveWord, setLeftActiveWord ] = useState("");

  const [ typoPresent, setTypoPresent ] = useState(false);


  const handleInput  = (e) => {

    let typedCharacter = e.target.value.charAt(e.target.value.length - 1).trim();
    document.getElementById("form-input").value = ""; 

    // Space bar handled in seperate function.
    if (typedCharacter === "") {
      return;
    }

    let isCorrectCharacter = typedCharacter === wordArray[arrayIndex.current].charAt(wordIndex.current);
    
    // If there is a typo, it must be cleared before new input can be added.
    if (!typoPresent) {

       // Correct input provided.
       if (isCorrectCharacter) {
        
        let updatedRight = rightActiveWord.slice(1);
        let updatedLeft = leftActiveWord + rightActiveWord.charAt(0);

        wordIndex.current ++;
            
        // If word has been spelt.
        if (updatedRight === "") {
          // arrayIndex.current = arrayIndex.current + 1;
          // setRightActiveWord(wordArray[arrayIndex.current]);
          // setLeftActiveWord("");
          // wordIndex.current = 0;
          setRightActiveWord(updatedRight);
          setLeftActiveWord(updatedLeft);
        } 

        else {
          let updatedLeft = leftActiveWord + rightActiveWord.charAt(0);
          setRightActiveWord(updatedRight);
          setLeftActiveWord(updatedLeft);
        }
      }

      // Incorrect input provided.
      else {
        console.log(`is it here?`);
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
      if (rightActiveWord === "") {
        wordStatusArray.current.push(true);
      }
      else {
        wordStatusArray.current.push(false);
      }

      arrayIndex.current++;
      setRightActiveWord(wordArray[arrayIndex.current]);
      setLeftActiveWord("");
      wordIndex.current = 0;
    }
  } 

  return (
    <div className="practice-page-wrapper">

      <div className="practice-page-bar">
        This will be the status bar! Will include a countdown timer and session reset button.
      </div>

      <div className="typing-screen-card-wrapper" style={{ marginTop : '50px'}}>
        
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
