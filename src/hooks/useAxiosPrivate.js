import { useEffect } from "react";
import axios, { axiosPrivate } from "../utilities/axios";
import useRefreshJWT from "./useRefreshJWT";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const refreshJWT = useRefreshJWT();
  const { auth } = useAuth();

  useEffect(() => {

    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {

        // If auth header doesn't exist... 1st attempt.
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
        }

        return config;
      }, (error) => {
        Promise.reject(error);
      }
    )

    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,

      // If access token is expired...
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;  // Prevent endless request loop!
          const newAccessToken = await refreshJWT();
          prevRequest.headers['authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    // Remove interceptors.
    return () => {
      axiosPrivate.interceptors.response.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    }

  }, [auth, refresh])

  return axiosPrivate;
}


export default axiosPrivate;