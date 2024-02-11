import React from "react";
import { AppTheme } from "./theme";
import { AppRouter } from "./router/AppRouter";

export const DashboardApp = () => {
  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  );
};
