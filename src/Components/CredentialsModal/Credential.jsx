import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import "./credential.css";

const Credential = ({ displayLogin, setDisplayLogin, setDisplayModal }) => {

  const { register, formState: { errors }, handleSubmit, clearErrors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    console.log(errors);
  }

  const [ renderFollowUp, setRenderFollowUp ] = useState(false);

  const handleRegistration = () => {
    setRenderFollowUp(true);
  }

  const handleModalExit = () => {
    let keys = Object.keys(errors)
    keys.forEach(key => {
      clearErrors(`${key}`);
    })
    setDisplayModal(false);
  }

  const renderLogin = () => {

    const loginForm = () => {
      return (
        <>
          <form className='credentials-form' onSubmit={handleSubmit(onSubmit)}>
            <input 
              { ...register("userName", { required: true, maxLength: 2 })} 
              aria-invalid={errors.userName ? "true" : "false" }
              placeholder={(errors.userName?.type === "required" && "Username is required.") || "Username"}
              className={errors.userName ? "credential-error" : "credential-input"}
              type="text" 
            />

            <input 
              {...register("password", { required: true })}
              aria-invalid={errors.password ? "true" : "false" }
              placeholder={(errors.password?.type === "required" && "Password is required.") || "Password"}
              className={errors.password ? "credential-error" : "credential-input"}
              type="text" 
            />

            <button className="credential-input submit" type='submit'> 
              Log In
            </button>
          </form>
    
          <span className='credential-prompt'> 
            Need to register? Click
            <span className='prompt-anchor' onClick={() => {setDisplayLogin(false)}}> here </span>
          </span>

          <button className='exit-btn' onClick={handleModalExit}> Close </button>
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
            <span className='prompt-anchor' onClick={() => {setDisplayLogin(true)}}> here </span>
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


  // const INITIAL_STATE = credentialForm;

  // const VALIDATION = {
  //   username: [
  //     { 
  //       isValid: (value) => !!value,
  //       message: "Username is required."
  //     }
  //   ],
  //   password: [
  //     {
  //       isValid: (value) => !!value,
  //       message: "Password is required."
  //     }
  //   ]
  // }

  // const getValidationErrors = () => {
  //   const errors = Object.keys(credentialForm).reduce((acc, key) => {
  //     if (!VALIDATION[key]) {
  //       return acc;
  //     }
      
  //     const fieldErrors = VALIDATION[key]
  //     .map((validationCheck) => (
  //       console.log(validationCheck)
  //       {
  //       isValid: validationCheck.isValid(credentialForm[key]),
  //       message: validationCheck.message
  //     }))
  //     .filter((fieldError) => !fieldError.isValid);

  //     return { ...acc, [key]: fieldErrors };
  //   }, {})

  //   return errors;
  // }
