import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

export default function useAxiosSecure() {
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const reqInterceptor = axios.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;

      return config;
    });

    const resInterceptor = axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);

        const errorStatus = error.status;

        if (errorStatus === 401 || errorStatus === 403) {
          logOutUser().then(() => {
            navigate("/login");
          });
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOutUser, navigate]);

  return axiosInstance;
}
