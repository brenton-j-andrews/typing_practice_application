import axios from "../utilities/axios";
import useAuth from "./useAuth";


export const useRefreshJWT = () => {
  
  const { setAuth } = useAuth();
  
  const refreshJWT = async () => {
    const response = await axios.get("/auth/refresh", {
      withCredentials: true
    });

    setAuth(prevAuth => {
      console.log(response);
      return {...prevAuth, 
        username : response.data.decoded.username,
        accessToken: response.data.accessToken} 
    })

    return response.data.accessToken;
  }

  return refreshJWT;
};

export default useRefreshJWT;