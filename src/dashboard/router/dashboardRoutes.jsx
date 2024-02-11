import { Route, Routes } from "react-router-dom";
import {
  AbarroTipsView,
  CategoriasView,
  ProductosView,
  ProveedoresView,
  SucursalesView,
} from "../views";

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductosView />} />
      <Route path="/productos" element={<ProductosView />} />
      <Route path="/sucursales" element={<SucursalesView />} />
      <Route path="/abarrotips" element={<AbarroTipsView />} />
      <Route path="/proveedores" element={<ProveedoresView />} />
      <Route path="/categorías" element={<CategoriasView />} />
    </Routes>
  );
};
