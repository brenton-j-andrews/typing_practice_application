import React from 'react';
import "./header.css";

const logo = require("../../assets/runner.png");

const Header = ({ setDisplayModal, setDisplayLogin }) => {

  const handleClick = (arg) => {
    setDisplayModal(true);
    setDisplayLogin(arg);
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
          <button className="header-button" onClick={() => {handleClick(false)}}>
            Create a Free Account
          </button>
            
            <button className="header-button" onClick={() => {handleClick(true)}}>
              Log In
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;