import axios from "../utilities/axios";
import useAuth from "./useAuth";

export const useRefreshJWT = () => {
  
  const { setAuth } = useAuth();

  const refreshJWT = async () => {
    const response = await axios.get("/auth/refresh", {
      withCredentials: true
    });

    setAuth(prevAuth => {
      console.log(prevAuth);
      console.log(response.data.accessToken);
      return {...prevAuth, accessToken: response.data} 
    })

    return response.data.accessToken;
  }

  return { refreshJWT };
};

export default useRefreshJWT;