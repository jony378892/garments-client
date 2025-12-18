import { Navigate } from "react-router";
import Loading from "../components/Shared/Loading";
import useRole from "../hooks/useRole";

export default function AdminRoute({ children }) {
  const { roleLoading, role } = useRole();

  if (roleLoading) {
    return <Loading />;
  }

  if (role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}
