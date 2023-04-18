import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';


const Login = ({ setDisplayModal }) => {

  const [ renderFollowUp, setRenderFollowUp ] = useState(false);

  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues : {
      "username" : "",
      "password" : ""
    }
  });

  const handleLogin = async (data, e) => {
    try { 
      const response = await axios.post("http://localhost:8080/auth", {
        username : data.username,
        password: data.password
      }, {
        headers : {
          'Content-Type' : 'content/json'
        }
      })
      console.log(response);
    }

    catch (error) {
      console.log(error);
    }
   
  }

  const onError = (errors, e) => console.log(errors, e);

  const handleModalExit = () => {;
    reset();
    setDisplayModal(false);
  }

  const loginForm = () => {
    return (
      <>
        <form className='credentials-form' onSubmit={handleSubmit(handleLogin, onError)}>
          <input 
            { ...register("username", { required: true, maxLength: 10 })} 
            aria-invalid={errors.username ? "true" : "false" }
            placeholder={(errors.username?.type === "required" && "Username is required.") || "Username"}
            className={errors.username ? "credential-error" : "credential-input"}
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
          <span className='prompt-anchor'> here </span>
        </span>

        <button className='exit-btn' onClick={handleModalExit}> Close </button>
      </>
    )
  }

  const loginFollowUp = () => {
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
        ? loginFollowUp()
        : loginForm()
      }

    </div>
  );
};

export default Login
