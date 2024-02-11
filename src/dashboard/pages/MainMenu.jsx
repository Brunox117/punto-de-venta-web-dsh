import { NavBar } from "../components/NavBar";
import { DashboardRoutes } from "../router/dashboardRoutes";

export const MainMenu = () => {
  return (
    <>
      <NavBar />
      <DashboardRoutes />
    </>
  );
};
