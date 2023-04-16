import React, { useState } from 'react';

import "./credential.css";

const Credential = ({ displayLogin, setDisplayLogin, setDisplayModal }) => {

  const [  renderFollowUp, setRenderFollowUp ] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setRenderFollowUp(true);
    console.log(`this is the login submit function`);
  }

  const handleRegistration = () => {
    setRenderFollowUp(true);
    console.log(`this is the registration submit function`);
  }

  const renderLogin = () => {

    const loginForm = () => {
      return (
        <>
          <form className='credentials-form' onSubmit={handleLogin}>
              <input 
                className='credential-input'
                type="text" 
                placeholder='Username'
              />
    
              <input
                className='credential-input'
                type="text" 
                placeholder='Password' 
              />
    
              <button className="credential-input submit" type='submit'> 
                Log In
              </button>
          </form>
    
          <span className='credential-prompt'> 
            Need to register? Click
            <a className='prompt-anchor' onClick={() => {setDisplayLogin(false)}}> here </a>
          </span>

          <button className='exit-btn' onClick={() => {setDisplayModal(false)}}> Close </button>
        </>
          
        
      )
    }

    const loginMessage = () => {
      return (
        <>
          <h4> Welcome Username! </h4>
          <span className='verification-prompt'>  You have successfully logged in! </span>

          <button className='exit-btn' onClick={() => {setDisplayModal(false)}}> Close </button>
        </>
      )
    }
    
    return (
      <div className="credentials">
        <div className='credential-header'> 
          <h3> Log In </h3>
        </div>

        {renderFollowUp 
          ? loginMessage()
          : loginForm()
        }

      </div>
    )
  }

  const renderRegister = () => {

    const registrationForm = () => {
      return (
        <>
          <form className='credentials-form' onSubmit={handleRegistration}>
            <input 
              className='credential-input'
              type="text" 
              placeholder='Username'
            />

            <input 
            className='credential-input'
              type="text" 
              placeholder='Email'
            />

            <input 
              className='credential-input'
              type="text" 
              placeholder='Password'
            />

            <input
              className='credential-input'
              type="text" 
              placeholder='Verify Password' 
            />

            <button className="credential-input submit" type='submit'> 
              Register Now! 
            </button>
          </form>

          <span className='credential-prompt'> 
            Have an account? Log in
            <a className='prompt-anchor' onClick={() => {setDisplayLogin(true)}}> here </a>
          </span>
          <button className='exit-btn' onClick={() => {setDisplayModal(false)}}> Close </button>
        </>
      )
    }

    const verificationMessage = () => {
      return (
        <>
          <h4> Registration Successful! </h4>
          <span className='verification-prompt'> To start typing, please click on the verification link sent to your email. Thanks! </span>

          <button className='exit-btn' onClick={() => {setDisplayModal(false)}}> Close </button>
        </>
      )
    }

    return (
      <div className="credentials">
        <div className='credential-header'> 
          <h3> Register </h3>
        </div>
        
        {renderFollowUp 
          ? verificationMessage()
          : registrationForm()
        }
      </div>
    )
  }

  return (
    <div className="modal-content">
      { displayLogin 
        ? renderLogin()
        : renderRegister()
      }
    </div>
  )
};

export default Credential;