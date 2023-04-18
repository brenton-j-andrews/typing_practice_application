import { useRef, useState, useEffect } from "react";

import "./register.css";

const USER_VALIDATION = /^[A-Z][a-zA-Z]{4,11}$/   //  Username must start with uppercase, consist only of letters,  and be between 8 and 20 characters.
const EMAIL_VALIDATION = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
const PASSWORD_VALIDATION = /^[\S]{8,20}$/


const Register = () => {
  const userRef = useRef();
  // const errorRef = useRef();

  const [ user, setUser ] = useState("");
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


  // Effect: on render, focus on user input.
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // Effect: check for valid username when user input changes.
  useEffect(() => {
    setIsValidUser(USER_VALIDATION.test(user));
  }, [user])

  // Effect: check for valid email on change of email value.
  useEffect(() => {
    setIsValidEmail(EMAIL_VALIDATION.test(email));
  }, [email])

  // Effect: check valid password. No criteria except between 8-20 characters.
  useEffect(() => {
    setIsValidPassword(PASSWORD_VALIDATION.test(password));
    setIsValidVerifyPassword(isValidPassword && password === verifyPassword);
  }, [password, verifyPassword, isValidPassword])

  return (
    <section className="credentials">

      <div className="credential-header">
        <h3> Register </h3>
      </div>

      <form className="credentials-form register-form">

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
                onChange={(e) => {setUser(e.target.value)}}
                value={user}
                required
                onFocus={() => {setUserFocus(true)}}
                onBlur={() => {setUserFocus(false)}}
              />  

              <p className={userFocus && !isValidUser ? "criteria" : "off-screen"}>
                Username must be between 5 and 12 characters, <br/>
                start with an uppercase letter, <br/>
                and consist only of letters.
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

        {/* <p>
          Already have an account?<br />
          <span className="line">
            <a href="#">Log In Here</a>
          </span>
        </p> */}
      </form>
      <p className="credential-prompt">
          Already have an account?<br />
          <span className="line">
            <a href="#">Log In Here</a>
          </span>
        </p>
    </section>
  );
};

export default Register;
