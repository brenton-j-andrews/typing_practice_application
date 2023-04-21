import { useContext } from "react";
import axios from "../utilities/axios";
import useAuth from "./useAuth";
import AuthContext from "../context/AuthProvider";


export const useRefreshJWT = () => {
  
  const { auth, setAuth } = useContext(AuthContext);
  
  const refreshJWT = async () => {
    const response = await axios.get("/auth/refresh", {
      withCredentials: true
    });

    setAuth(prevAuth => {
      console.log("prev auth: ", prevAuth);
      console.log(response.data.accessToken);
      return {...prevAuth, accessToken: response.data.accessToken} 
    })

    return response.data.accessToken;
  }

  return { refreshJWT };
};

export default useRefreshJWT;