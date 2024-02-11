import { Route, Routes } from "react-router-dom";
import { MainMenu } from "../dashboard/pages/MainMenu";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/*" element={<MainMenu />} />
    </Routes>
  );
};
