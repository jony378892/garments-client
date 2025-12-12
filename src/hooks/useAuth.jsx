import { use } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";

export default function useAuth() {
  const auth = use(AuthContext);
  return auth;
}
