import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import AuthContext from "../../context/AuthProvider";

const LOGIN_URL = "/auth";

const Login = ({ setModalMode }) => {

  const { setAuth } = useContext(AuthContext);

  const [ username, setUserName ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ errorMessage, setErrorMessage ] = useState(false);

  const [ renderFollowUp, setRenderFollowUp ] = useState(false);

  // Effect: clear errors if present on change of username or password state.
  useEffect(() => {
    setErrorMessage(false)
  }, [username, password])
  
  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({ username, password }),
        {
          headers : {
            'Content-Type' : 'application/json'
          },
          withCredentials: true
        }
      );
      console.log(JSON.stringify(response?.data));
      setUserName("");
      setPassword("");
      setRenderFollowUp(true);
    }
    catch (error) {
      if (!error?.response) {
        setErrorMessage("There is a problem with the server, try again later.");
      } else if (error.response?.status === 401) {
        setErrorMessage("Incorrect Credentials Provided.");
      } else {
        setErrorMessage("Login failed, try again later.")
       }
    }
  }

  // Rendering functions.
  const loginForm = () => {
    return (
      <>
        <div className='credential-header'> 
          <h3> Log In </h3>
        </div>

        {errorMessage && 
          <p className="error-prompt"> { errorMessage }</p>
        }

        <form className='credentials-form login-form' onSubmit={handleSubmit}>

          <div className="form-section">
            <label htmlFor="username" className="credential-label"> 
              Username:
            </label>
            <input 
              className="credential-input"
              type="text"
              id="username"
              autoComplete="off"
              onChange={(e) => {setUserName(e.target.value)}}
              value={username}
              required
            />

            <label htmlFor="password" className="credential-label"> 
              Password:
            </label>
            <input 
              className="credential-input"
              type="text"
              id="password"
              onChange={(e) => {setPassword(e.target.value)}}
              value={password}
              autoComplete="off"
              required
            />

          </div>

          <button className="credential-submit" disabled={username && password ? false : true}> 
            Log In
          </button>
        </form>
  
        <span className='credential-prompt'> Need to register? </span>
        <span className='modal-redirect' onClick={() => {setModalMode("register")}}>  Click here </span>

      </>
    )
  }

  const loginFollowUp = () => {
    return (
      <>
        <h4> Welcome Username! </h4>
        <span className='verification-prompt'>  You have successfully logged in! </span>
      </>
    )
  }

  return (
    <div className="credentials">
      {renderFollowUp 
        ? loginFollowUp()
        : loginForm()
      }
    </div>
  );
};

export default Login
