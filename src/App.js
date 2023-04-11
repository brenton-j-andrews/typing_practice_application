import { useState } from "react";

import Header from './Components/Header/Header';
import Selection from './Components/Selection/Selection';
import Scores from './Components/HighScores/Scores';
import Practice from './Pages/Practice/Practice';

import './App.css';

function App() {

  const [ typingTime, setTypingTime ] = useState(1);

  return (
    <div className="app-wrapper">
      <Header />

      <div className="app-upper">
        <Selection 
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
