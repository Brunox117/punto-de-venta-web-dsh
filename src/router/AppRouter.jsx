import { Route, Routes } from "react-router-dom";
import { MainMenu } from "../dashboard/pages/MainMenu";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { AuthRoutes } from "../auth/routes/AuthRoutes";

export const AppRouter = () => {
  const { status } = useCheckAuth();
  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/*" element={<MainMenu />} />
      ) : (
        <Route path="/*" element={<AuthRoutes />} />
      )}
    </Routes>
  );
};
