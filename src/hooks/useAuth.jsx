import React, { use } from "react";
import AuthContext from "./Auth/AuthContext";

export default function useAuth() {
  const auth = use(AuthContext);

  return auth;
}
