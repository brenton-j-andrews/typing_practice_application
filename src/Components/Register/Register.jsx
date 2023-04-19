import { useRef, useState, useEffect } from "react";
import axios from "../../utilities/axios";

import "./register.css";

const USER_VALIDATION = /^[a-zA-Z0-9]{5,12}$/   //  Username must start with uppercase, consist only of letters,  and be between 8 and 20 characters.
const EMAIL_VALIDATION = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
const PASSWORD_VALIDATION = /^[\S]{8,20}$/
const REGISTER_URL = "/register";

const Register = () => {
  const userRef = useRef();

  const [ username, setUserName ] = useState("");
  const [ isValidUser, setIsValidUser ] = useState(false);
  const [ userFocus, setUserFocus ] = useState(false);

  const [ email, setEmail ] = useState("");
  const [ isValidEmail, setIsValidEmail ] = useState(false);
  const [ emailFocus, setEmailFocus ] = useState(false);

  const [ password, setPassword ] = useState("");
  const [ isValidPassword, setIsValidPassword ] = useState(false);
  const [ passwordFocus, setPasswordFocus ] = useState(false);

  const [ verifyPassword, setVerifyPassword,] = useState("");
  const [ isValidVerifyPassword, setIsValidVerifyPassword ] = useState(false);
  const [ verifyPasswordFocus, setVerifyPasswordFocus ] = useState(false);

  const [ displayFollowUp, setDisplayFollowUp ] = useState(false);

  const [ errorMessage, setErrorMessage ] = useState(false);

  // Effect: on render, focus on user input.
  useEffect(() => {
    if (!displayFollowUp) userRef.current.focus();
  }, [ displayFollowUp ]);

  // Effect: check for valid username when user input changes.
  useEffect(() => {
    setIsValidUser(USER_VALIDATION.test(username));
  }, [username])

  // Effect: check for valid email on change of email value.
  useEffect(() => {
    setIsValidEmail(EMAIL_VALIDATION.test(email));
  }, [email])

  // Effect: check valid password. No criteria except between 8-20 characters.
  useEffect(() => {
    setIsValidPassword(PASSWORD_VALIDATION.test(password));
    setIsValidVerifyPassword(isValidPassword && password === verifyPassword);
  }, [password, verifyPassword, isValidPassword])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(REGISTER_URL,
          JSON.stringify({ username, email, password}), 
          {
            headers : {
              'Content-Type' : 'application/json'
            },
            withCredentials: true
          }
        )
        setDisplayFollowUp(true);

    } catch (error) {
       if (!error?.response) {
        setErrorMessage("There is a problem with the server, try again later.");
       } else if (error.response?.status === 409) {
        setErrorMessage(error.response.data.message);
       } else {
        setErrorMessage("Registration failed, try again later.")
       }
    }
  }

  // Render Functions.
  const registerForm = () => {
    return (
      <>
        <div className="credential-header">
          <h3> Register </h3>
        </div>

        {errorMessage && 
          <p className="error-prompt"> { errorMessage }</p>
        }

        <form className="credentials-form register-form" onSubmit={handleSubmit}>

          <div className="form-inputs">
            <div className="form-left">
              <div className="form-section">
                <label htmlFor="username" className="credential-label"> 
                  Username:
                  {isValidUser && <div className="valid-checkmark" /> }
                </label>

                <input 
                  className="credential-input"
                  type="text"
                  id="username"
                  ref={userRef} 
                  autoComplete="off"
                  onChange={(e) => {setUserName(e.target.value)}}
                  value={username}
                  required
                  onFocus={() => {setUserFocus(true)}}
                  onBlur={() => {setUserFocus(false)}}
                />  

                <p className={userFocus && !isValidUser ? "criteria" : "off-screen"}>
                  Username must be between 5 and 12 characters in length <br/>
                  and consist only of letters and numbers.
                </p>
              </div>

              <div className="form-section">
                <label htmlFor="email" className="credential-label"> 
                  Email:
                  {isValidEmail && <div className="valid-checkmark" /> }
                </label>
                
                <input 
                  className="credential-input"
                  type="text"
                  id="email"
                  ref={userRef} 
                  autoComplete="off"
                  onChange={(e) => {setEmail(e.target.value)}}
                  value={email}
                  required
                  onFocus={() => {setEmailFocus(true)}}
                  onBlur={() => {setEmailFocus(false)}}
                />  

                <p className={emailFocus && !isValidEmail ? "criteria" : "off-screen"}>
                  Enter a valid email address. 
                </p>
              </div>
            </div>

            <div className="form-right">
              <div className="form-section">
                <label htmlFor="password" className="credential-label"> 
                  Password:
                  {isValidPassword && <div className="valid-checkmark" /> }
                </label>

                <input 
                  className="credential-input"
                  type="text"
                  id="password"
                  onChange={(e) => {setPassword(e.target.value)}}
                  value={password}
                  autoComplete="false"
                  required
                  onFocus={() => {setPasswordFocus(true)}}
                  onBlur={() => {setPasswordFocus(false)}}
                />  

                <p className={passwordFocus && !isValidPassword ? "criteria" : "off-screen"}>
                  Password must be between 8 and 20 characters, no other rules!
                </p>
              </div>

              <div className="form-section">

                <label htmlFor="verify_password" className="credential-label"> 
                  Verify Password:
                  {isValidVerifyPassword && <div className="valid-checkmark" /> }
                </label>

                <input 
                  className="credential-input"
                  type="text"
                  id="verify_password"
                  onChange={(e) => {setVerifyPassword(e.target.value)}}
                  value={verifyPassword}
                  autoComplete="false"
                  required
                  onFocus={() => {setVerifyPasswordFocus(true)}}
                  onBlur={() => {setVerifyPasswordFocus(false)}}
                />  

                <p className={verifyPasswordFocus && !isValidVerifyPassword ? "criteria" : "off-screen"}>
                  Passwords must match!
                </p>
              </div>
            </div>
          </div>
          

          <button className="credential-submit" disabled={!isValidUser || !isValidPassword || !isValidEmail || !isValidVerifyPassword ? true : false}> 
            Register Now 
          </button>
        </form>
        <p className="credential-prompt">
          Already have an account?<br />
          <span className="line">
            <a href="#">Log In Here</a>
          </span>
        </p>
      </>
    )
  }

  const registerFollowUp = () => {
    return (
      <>
        <h4> Registration Successful! </h4>
        <span className='verification-prompt'> To start typing, please click on the verification link sent to your email. Thanks! </span>
      </>
    )
  }

  return (
    <section className="credentials">
      {displayFollowUp 
        ? registerFollowUp()
        : registerForm()
      }
    </section>
  );
};

export default Register;
