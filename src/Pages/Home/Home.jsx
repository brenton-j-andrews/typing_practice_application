import React from 'react';

import Selection from '../../Components/Selection/Selection';
import Scores from '../../Components/HighScores/Scores';

import "./home.css";

const Home = ({
  typingDifficulty,
  setTypingDifficulty,
  typingDuration,
  setTypingDuration,
  selectedArrayName,
  setSelectedArrayName
}) => {

  return (
    <div className="home-wrapper">

       <div className="home-upper">
        <Selection 
          typingDifficulty={typingDifficulty}
          setTypingDifficulty={setTypingDifficulty}

          typingDuration={typingDuration}
          setTypingDuration={setTypingDuration}

          selectedArrayName={selectedArrayName}
          setSelectedArrayName={setSelectedArrayName}
        />

        <Scores 
          typingDifficulty={typingDifficulty}
          typingDuration={typingDuration}
          selectedArrayName={selectedArrayName}
        />
      </div>

      <button className="start-btn" disabled={false}>
        Start Practice
      </button>
    </div>
  );
};

export default Home;