import React, { useState, useRef } from 'react';

import "./typing_screen.css";

const TypingScreen = ({ 
  wordArray, 
  characterCount, 
  setCharacterCount,
  errorCount,
  setErrorCount,
  sessionIsOver
}) => {

  let arrayIndex = useRef(0);
  let wordIndex = useRef(0);

  const [ rightActiveWord, setRightActiveWord ] = useState(wordArray[arrayIndex.current]);
  const [ leftActiveWord, setLeftActiveWord ] = useState("");

  const [ typoPresent, setTypoPresent ] = useState(false);


  const handleInput  = (e) => {
    let typedCharacter = e.target.value.charAt(e.target.value.length - 1).trim();
    
    document.getElementById("form-input").value = ""; 
    if (typedCharacter === "") return;
    let isCorrectCharacter = typedCharacter === wordArray[arrayIndex.current].charAt(wordIndex.current);

    if (!typoPresent) {
       if (isCorrectCharacter) {
        setCharacterCount(characterCount + 1);
        let updatedRight = rightActiveWord.slice(1);
        let updatedLeft = leftActiveWord + rightActiveWord.charAt(0);

        wordIndex.current ++;
        setRightActiveWord(updatedRight);
        setLeftActiveWord(updatedLeft);
      }

      else {
        setErrorCount(errorCount + 1);
        setLeftActiveWord(leftActiveWord + typedCharacter);
        setTypoPresent(true);
      }
    }
  }

  const handleSpaceAndBackspace = (e) => {

    // Backspace key
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
    if (e.keyCode === 32 && !typoPresent) {
      if (rightActiveWord === "") {
        setCharacterCount(characterCount + 1);
        arrayIndex.current++;
        setRightActiveWord(wordArray[arrayIndex.current]);
        setLeftActiveWord("");
        wordIndex.current = 0;
        setTypoPresent(false);
      } 
      else {
        setErrorCount(errorCount + 1);
        setLeftActiveWord(leftActiveWord + "_"); 
        setTypoPresent(true);
      }     
    }
  } 

  const focusOnHiddenInput = () => {
    document.getElementById("form-input").focus(); 
  }

  return (
    <div className="typing-screen-wrapper">
      <div 
        className={sessionIsOver ? "typing-screen-card-wrapper done" : "typing-screen-card-wrapper"} 
        onClick={() => {focusOnHiddenInput()}}
      >
        <div className="screen-card-content-left">
          {wordArray.map((word, index) => {
            word = word.replace("_", " ");
            if (index < arrayIndex.current) {
              return (
                <div className="screen-word word-correct" key={word + index}>
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
          <div className={sessionIsOver ? "screen-word" : "screen-word active-word"}> 
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
          disabled={sessionIsOver}
        />
      </form> 
    </div>
   
  );
};

export default TypingScreen;