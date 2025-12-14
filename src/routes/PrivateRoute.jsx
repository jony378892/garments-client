import { Navigate, useLocation } from "react-router";
import Loading from "../components/Shared/Loading";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ children }) {
  const { loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    <Navigate state={location.pathname} to="/login" />;
  }

  return children;
}
