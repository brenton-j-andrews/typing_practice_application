/**
 * The practice page will render the typing speed test and track all data associated with a single practice session.
 */

import React, { useState, useRef } from 'react';

import "./practice.css";

const Practice = () => {


  let wordArray = ["hello ", "world ", "I ", "am ", "Brenton ", "J ", "Andrews "];

  let arrayIndex = useRef(0);
  let wordIndex = useRef(0)
  let errorIndex = useRef(0);

  const [ rightActiveWord, setRightActiveWord ] = useState(wordArray[arrayIndex.current]);
  const [ leftActiveWord, setLeftActiveWord ] = useState("");

  const [ typoPresent, setTypoPresent ] = useState(false);


  const handleKeyStroke = (e) => {
    let typedCharacter = e.target.value.charAt(e.target.value.length - 1);
    document.getElementById("form-input").value = "";

    let isCorrectCharacter = typedCharacter === wordArray[arrayIndex.current].charAt(wordIndex.current);
    
    // Character can only be correct if there are no current errors.
    if (!typoPresent) {

       // Correct input provided.
       if (isCorrectCharacter) {
        let updatedRight = rightActiveWord.slice(1);

        wordIndex.current = wordIndex.current + 1;
            
        if (updatedRight === "") {
          setRightActiveWord(wordArray[arrayIndex + 1]);
          setLeftActiveWord("")
          arrayIndex.current = arrayIndex.current + 1;
        } 

        else {
          let updatedLeft = leftActiveWord + rightActiveWord.charAt(0);
          setRightActiveWord(updatedRight);
          setLeftActiveWord(updatedLeft);
        }
      }

      // Incorrect input provided.
      else {
        // errorIndex.current ++;
        // console.log(errorIndex.current);
        setLeftActiveWord(leftActiveWord + typedCharacter);
        setTypoPresent(true);
      }
    }
  }

  const handleBackspace = (e) => {

    // Backspace key.
    if (e.keyCode === 8) {

      let updatedLeft = leftActiveWord.slice(0, -1);

      // Clear correct characters.
      if (!typoPresent) {
        let updatedRight = leftActiveWord.charAt(leftActiveWord.length - 1);
        setRightActiveWord(updatedRight + rightActiveWord);
        setLeftActiveWord(updatedLeft);
        wordIndex.current --;
      }

      // Clear erroneous characters.
      else {
        setLeftActiveWord(updatedLeft);
        setTypoPresent(false);
      } 
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
                <div className="screen-word word-correct">
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
                <span className="screen-word">
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
          onChange={handleKeyStroke}
          onKeyDown={handleBackspace}
        />
      </form>
    </div>
  );
};

export default Practice;
