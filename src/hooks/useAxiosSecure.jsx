import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

const useAxiosSecure = () => {
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // intercept request
    const reqInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          try {
            // Get fresh ID token from Firebase user
            const token = await user.getIdToken(true); // true forces refresh
            config.headers.Authorization = `Bearer ${token}`;
          } catch (error) {
            console.error("Error getting ID token:", error);
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // interceptor response
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        console.log(error);
        const statusCode = error?.response?.status;

        if (statusCode === 401 || statusCode === 403) {
          try {
            await logOutUser();
            navigate("/login");
          } catch (logoutError) {
            console.error("Logout error:", logoutError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOutUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
