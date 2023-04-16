import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./Pages/Home/Home";
import Practice from "./Pages/Practice/Practice";
import Header from './Components/Header/Header';
import CredentialModal from "./Components/CredentialsModal/Credential";

import './App.css';

function App() {

  const [ typingDifficulty, setTypingDifficulty ] = useState("Easy");
  const [ typingDuration, setTypingDuration ] = useState(1);
  const [ selectedArrayName, setSelectedArrayName ] = useState();

  const [ displayModal, setDisplayModal ] = useState(false);
  const [ displayLogin, setDisplayLogin ] = useState(null);

  // Effect: on change of displayModal, modify modal css to appear.
  useEffect(() => {
    const toggleModal = () => {
      let modal = document.getElementById("modalWrapper");
      if (modal.style.display === "none") {
        modal.style.display = "block";
      }
      else {
        modal.style.display = "none";
      }
    }

    toggleModal();
  }, [ displayModal ]);



  return (
    <div className="app-wrapper">

      <Header 
        setDisplayModal={setDisplayModal}
        setDisplayLogin={setDisplayLogin}
      />
    
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

      <div className="modal-wrapper" id="modalWrapper">
        <CredentialModal 
          displayLogin={displayLogin}
          setDisplayLogin={setDisplayLogin}
          setDisplayModal={setDisplayModal}
        />
      </div>
    </div>
  );
}

export default App;
