import React from 'react';
import { Link } from "react-router-dom";

import Selection from '../../Components/Selection/Selection';
import Scores from '../../Components/Scores/Scores';

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

      <Link to="/practice">
        <button className="start-btn" >
          Start Challenge
        </button>
      </Link>
    </div>
  );
};

export default Home;