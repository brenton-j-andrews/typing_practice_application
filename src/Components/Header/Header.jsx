import React from 'react';
import "./header.css";

const logo = require("../../assets/runner.png");

const Header = ({ setModalMode, setDisplayModal }) => {

  const handleClick = (arg) => {
    setModalMode(arg);
    setDisplayModal(true);
  }

  return (
    <header className="app-header-wrapper">
      <div className="app-header">
        <div className="header-left">
          <h1 className="header-title"> Typing Speed Challenge </h1>
          <img 
            className='header-logo'
            src={logo}
            alt=""
          />
        </div>

        <div className="header-right">
          <button className="header-button" onClick={() => {handleClick("register")}}>
            Create a Free Account
          </button>
            
            <button className="header-button" onClick={() => {handleClick("login")}}>
              Log In
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;