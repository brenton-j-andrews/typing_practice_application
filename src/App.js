import { useEffect, useState } from "react";

import Header from './Components/Header/Header';
import Selection from './Components/Selection/Selection';
import Scores from './Components/HighScores/Scores';
import Controls from "./Components/Controls/Controls"
import Practice from './Pages/Practice/Practice';

import './App.css';

function App() {

  const [ typingDifficulty, setTypingDifficulty ] = useState("easy");
  const [ typingDuration, setTypingDuration ] = useState(1);
  const [ selectedArrayName, setSelectedArrayName ] = useState();

  return (
    <div className="app-wrapper">
      <Header />

      <div className="app-upper">
        <Selection 
          typingDifficulty={typingDifficulty}
          setTypingDifficulty={setTypingDifficulty}

          typingDuration={typingDuration}
          setTypingDuration={setTypingDuration}

          selectedArrayName={selectedArrayName}
          setSelectedArrayName={setSelectedArrayName}
        />
        <Scores />
      </div>

      <Controls />
      <Practice />

    </div>
  );
}

export default App;
