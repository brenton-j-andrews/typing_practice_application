import React from 'react';
import "./header.css";


const logo = require("../../assets/runner.png");


const Header = () => {
  return (
    <header className="app-header">
        <div className="header-left">
          <h2 className="header-title"> Typing Speed Challenge </h2>
          <img 
            className='header-logo'
            src={logo}
            alt=""
          />
        </div>

        <div className="header-right">
          <button className="user-authentication-btn">
            Create a Free Account
          </button>
            
            <button className="user-authentication-btn">
              Log In Here
            </button>
        </div>
      </header>
  );
};

export default Header;