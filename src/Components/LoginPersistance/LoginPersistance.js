import React, { useState, useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';

import useRefreshJWT from '../../hooks/useRefreshJWT';
import useAuth from '../../hooks/useAuth';



const LoginPersistance = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const { refreshJWT } = useRefreshJWT();
  const { auth } = useAuth();

  // Effect: if no access token present, get new one from API with refresh token.
  useEffect(() => {
    const verifyRefreshJWT = async () => {
      try {
        await refreshJWT();
      }
      catch (error) {
        console.log(error);  
      }
      finally {
        setIsLoading(false);
      }
    }

    !auth?.accessToken ? verifyRefreshJWT() : setIsLoading(false);
  }, [])

  // // For debugging, delete later!
  // useEffect(() => {
  //   console.log(`isLoading: ${isLoading}`);
  //   console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
  // }, [isLoading])

  return (
    <>
      {isLoading ? 
        <p> Loading... </p>  
        : <Outlet />
      } 
    </>
  );
};

export default LoginPersistance;