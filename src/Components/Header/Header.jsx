import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import "./header.css";

const logo = require("../../assets/runner.png");

const Header = ({ setModalMode, setDisplayModal }) => {

  const { auth } = useAuth();

  const handleClick = (arg) => {
    setModalMode(arg);
    setDisplayModal(true);
  }

  const signedOutUser = () => {
    return (
      <>
        <button className="header-button" onClick={() => {handleClick("register")}}>
          Create a Free Account
        </button>
          
        <button className="header-button" onClick={() => {handleClick("login")}}>
          Log In
        </button>
      </>
    )
  }

  const signedInUser = () => {
    return (
      <>
        <div className="header-right">
          {auth?.username && <p style={{ color: 'white' }}> Hello { auth.username }! </p>}
        </div>

        <Link to="/account">
          <button className="header-button">
            Account Page
          </button>
        </Link>

          
        <button className="header-button">
          Log Out
        </button>
      </>
    )
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
          {auth.username
          ? signedInUser() 
          : signedOutUser()
          }
        </div>
      </div>
    </header>
  );
};

export default Header;