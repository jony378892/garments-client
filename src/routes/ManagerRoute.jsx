import { Navigate } from "react-router";
import Loading from "../components/Shared/Loading";
import useRole from "../hooks/useRole";

export default function ManagerRoute({ children }) {
  const { roleLoading, role } = useRole();

  if (roleLoading) {
    return <Loading />;
  }

  if (role !== "manager") {
    return <Navigate to="/" />;
  }

  return children;
}
