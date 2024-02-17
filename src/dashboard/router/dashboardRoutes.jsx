import { Route, Routes } from "react-router-dom";
import {
  AbarroTipsView,
  BannersView,
  CategoriasView,
  ProductosView,
  ProveedoresView,
  SucursalesView,
} from "../views";
import {
  useBanners,
  useBranches,
  useCategories,
  usePosts,
  useProducts,
  useSuppliers,
} from "../../hooks/firebaseDB/getFromFirebaseDB";

export const DashboardRoutes = () => {
  useSuppliers();
  useCategories();
  useBranches();
  useProducts();
  usePosts();
  useBanners();
  return (
    <Routes>
      <Route path="/" element={<ProductosView />} />
      <Route path="/productos" element={<ProductosView />} />
      <Route path="/sucursales" element={<SucursalesView />} />
      <Route path="/abarrotips" element={<AbarroTipsView />} />
      <Route path="/proveedores" element={<ProveedoresView />} />
      <Route path="/categorías" element={<CategoriasView />} />
      <Route path="/categorías" element={<CategoriasView />} />
      <Route path="/banners" element={<BannersView />} />
    </Routes>
  );
};
