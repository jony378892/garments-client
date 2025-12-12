import axios from "axios";

export default function useAxios() {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
  });

  return axiosInstance;
}
