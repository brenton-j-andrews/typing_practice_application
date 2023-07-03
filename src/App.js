import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./Pages/Home/Home";
import Practice from "./Pages/Practice/Practice";
import Account from "./Pages/Account/Account";
import Header from './Components/Header/Header';
import Modal from "./Components/Modal/Modal";

import './App.css';

function App() {

  const [ typingDifficulty, setTypingDifficulty ] = useState("Easy");
  const [ typingDuration, setTypingDuration ] = useState(1);
  const [ selectedArrayName, setSelectedArrayName ] = useState();

  const [ modalMode, setModalMode ] = useState(null);

  // Effect: on change of displayModal, modify modal css to appear.
  useEffect(() => {
    const toggleModal = () => {
      let modal = document.getElementById("modalWrapper");
      if (modalMode !== null) {
        modal.style.display = "block";

      }
      else {
        modal.style.display = "none";
      }
    }

    toggleModal();
  }, [ modalMode ]);

  return (
    <div className="app-wrapper">

      <BrowserRouter>
        <Header 
          setModalMode={setModalMode}
        />

        <div className="page-wrapper">
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


            <Route 
              path="/account"
              element={
                <Account 
                  setModalMode={setModalMode}
                />
              }
            />
          </Routes>
        </div>


        <div className="modal-wrapper" id="modalWrapper">

            <Modal 
              modalMode={modalMode}
              setModalMode={setModalMode}
            />
          
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
