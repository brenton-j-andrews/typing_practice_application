import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Header from './Components/Header/Header';
import Home from "./Pages/Home/Home";
import Practice from "./Pages/Practice/Practice";

import './App.css';

function App() {

  const [ typingDifficulty, setTypingDifficulty ] = useState("Easy");
  const [ typingDuration, setTypingDuration ] = useState(1);
  const [ selectedArrayName, setSelectedArrayName ] = useState();

  return (
    <div className="app-wrapper">
      <Header />
    
      <div className="page-wrapper">
        <BrowserRouter>
          <Routes>
            <Route 
              exact path="/"
              element={
                <Home 
                  typingDifficulty={typingDifficulty}
                  setTypingDifficulty={setTypingDifficulty}
          
                  typingDuration={typingDuration}
                  setTypingDuration={setTypingDuration}
          
                  selectedArrayName={selectedArrayName}
                  setSelectedArrayName={setSelectedArrayName}
                />
              }
            />

            <Route
              path="/practice"
              element={
                <Practice 
                  typingDifficulty={typingDifficulty}
                  typingDuration={typingDuration}
                  selectedArrayName={selectedArrayName}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
