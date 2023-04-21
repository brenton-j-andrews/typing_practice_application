/**
 * The Account page renders statistics for the logged in user, or a create account prompt for guests. 
 */

import React, { useState, useEffect, useContext } from 'react';
import useAxiosPriavte from "../../hooks/useAxiosPrivate";
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';

const Account = () => {

  const { auth } = useContext(AuthContext);
  const [ loggedIn, setLoggedIn ] = useState(null);
  const axiosPrivate = useAxiosPriavte();
  const [ test, setTest ] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const testCall = async() => {
      try {
        const response = await axiosPrivate.get("/test", {
          signal: controller.signal
        });

        console.log(response.data);
        isMounted && setLoggedIn(true);
      }
      catch (error) {
        setLoggedIn(false);
        console.log(error);
      }
    }

    testCall();

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [test]);

  return (
    <div>
      {loggedIn 
        ? <p> Hello {auth.username}, {test } </p>
        : <p> This page is for signed in users only my man!</p>
      }
      <Link to="/">
        <button> Go home! </button>
      </Link>

      <button onClick={() => {setTest(test + 1)}}> Re render </button>
    </div>
  );
};

export default Account;