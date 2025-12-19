import useRole from "../../../hooks/useRole";
import Loading from "../../../components/Shared/Loading";
import DashboardHomeAdmin from "./DashboardHomeAdmin";
import DashboardHomeManager from "./DashboardHomeManager";
import DashboardHomeBuyer from "./DashboardHomeBuyer";

export default function DashboardHome() {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <Loading />;
  }

  if (role == "admin") {
    return <DashboardHomeAdmin />;
  } else if (role == "manager") {
    return <DashboardHomeManager />;
  } else if (role == "buyer") {
    return <DashboardHomeBuyer />;
  }
}
