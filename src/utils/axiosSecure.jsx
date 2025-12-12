import axios from "axios";

export default function axiosSecure() {
  const instance = axios.create("/http:localhost:3000");

  return instance;
}
