import { useEffect, useState } from "react";

import Header from './Components/Header/Header';
import Selection from './Components/Selection/Selection';
import Scores from './Components/HighScores/Scores';
import Practice from './Pages/Practice/Practice';

import './App.css';

function App() {

  const [ typingDifficulty, setTypingDifficulty ] = useState("easy");
  const [ typingTime, setTypingTime ] = useState(1);

  useEffect(() => {
    console.log(typingDifficulty, typingTime);
  }, [ typingDifficulty, typingTime ]);

  return (
    <div className="app-wrapper">
      <Header />

      <div className="app-upper">
        <Selection 
          typingDifficulty={typingDifficulty}
          setTypingDifficulty={setTypingDifficulty}
          typingTime={typingTime}
          setTypingTime={setTypingTime}
        />
        <Scores />
      </div>

      <Practice />
    </div>
  );
}

export default App;
