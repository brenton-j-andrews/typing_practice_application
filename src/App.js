import { useState } from "react";

import Header from './Components/Header/Header';
import Home from "./Pages/Home/Home";

import './App.css';

function App() {

  const [ typingDifficulty, setTypingDifficulty ] = useState("Easy");
  const [ typingDuration, setTypingDuration ] = useState(1);
  const [ selectedArrayName, setSelectedArrayName ] = useState();

  return (
    <div className="app-wrapper">
      <Header />

      <Home 
        typingDifficulty={typingDifficulty}
        setTypingDifficulty={setTypingDifficulty}

        typingDuration={typingDuration}
        setTypingDuration={setTypingDuration}

        selectedArrayName={selectedArrayName}
        setSelectedArrayName={setSelectedArrayName}
        />
        
    </div>
  );
}

export default App;
