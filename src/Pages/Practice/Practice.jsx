/**
 * The practice page will render the typing speed test and track all data associated with a single practice session.
 */

import React, { useState, useRef } from 'react';

import "./practice.css";

const Practice = () => {


  let wordArray = ["aaaaa ", "world ", "I ", "am ", "Brenton ", "J ", "Andrews "];

  let arrayIndex = useRef(0);
  let wordIndex = useRef(0);

  const [ rightActiveWord, setRightActiveWord ] = useState(wordArray[arrayIndex.current]);
  const [ leftActiveWord, setLeftActiveWord ] = useState("");


  const handleKeyStroke = (e) => {
    let typedCharacter = e.target.value;
    document.getElementById("form-input").value = "";

    let updatedRight = rightActiveWord.slice(1);
    console.log("word, ", wordArray[arrayIndex.current].charAt(wordIndex.current));
    console.log(`input: `, typedCharacter);


    // Check for correct input.
    if (typedCharacter === wordArray[arrayIndex.current].charAt(wordIndex.current)) {

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

    else {
      console.log(`wrong dude!`);
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

          <div className="screen-word active-left"> 
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

      {/* <button onClick={handleIncrement}> Increment </button>
      <button onClick={handleDecrement}> Decrement </button> */}
      {/* <button onClick={handleKeyStroke}> Test space </button> */}

      <form action='/'>
        <input id="form-input" type="text" autoFocus className="type-text-input" onChange={(e) => {handleKeyStroke(e)}}/>
      </form>
    </div>
  );
};

export default Practice;

// const handleIncrement = () => {
//   setRightActiveWord(wordArray[arrayIndex + 1]);
//   setArrayIndex(arrayIndex + 1);
// }

// const handleDecrement = () => {
//   setRightActiveWord(wordArray[arrayIndex - 1]);
//   setArrayIndex(arrayIndex - 1);
// }