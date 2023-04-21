/**
 * The Account page renders statistics for the logged in user, or a create account prompt for guests. 
 */

import React, { useState, useEffect, useContext } from 'react';
import axios from '../../utilities/axios';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';

const Account = () => {

  const { auth } = useContext(AuthContext);
  const [ loggedIn, setLoggedIn ] = useState(false);

  useEffect(() => {
    const testCall = async() => {
      try {
        await axios.get("/test", {
          headers : {
            'Authorization' : `Bearer ${auth.accessToken}`
          },
          withCredentials: true
        });
        setLoggedIn(true);
      }
      catch (error) {
        console.log(error);
      }
    }
    testCall();
  }, []);

  return (
    <div>
      {loggedIn 
        ? <p> Hello {auth.username} </p>
        : <p> This page is for signed in users only my man!</p>
      }
      <Link to="/">
        <button> Go home! </button>
      </Link>
    </div>
  );
};

export default Account;